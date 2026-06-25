import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const [subscription, setSubscription] = useState(() => {
    try {
      const stored = localStorage.getItem('user_subscription');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleSubChange = () => {
      try {
        const storedSub = localStorage.getItem('user_subscription');
        setSubscription(storedSub ? JSON.parse(storedSub) : null);
      } catch (err) {
        console.error(err);
      }
    };

    window.addEventListener('subscriptionChange', handleSubChange);
    return () => {
      window.removeEventListener('subscriptionChange', handleSubChange);
    };
  }, []);

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'id' ? 'en' : 'id';
    i18n.changeLanguage(nextLang);
  };

  const handleLogout = async () => {
    await signOut();
    window.dispatchEvent(new Event('subscriptionChange'));
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const avatarUrl = user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0D8ABC&color=fff&rounded=true`;

  const renderBadge = () => {
    if (!subscription || !subscription.active) return null;
    
    const plan = subscription.plan;
    let badgeStyle = '';
    let label = '';
    
    switch (plan) {
      case 'bronze':
        badgeStyle = 'bg-gradient-to-r from-orange-400 to-amber-600 text-white';
        label = 'Bronze';
        break;
      case 'silver':
        badgeStyle = 'bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500 text-white shadow-sm';
        label = 'Silver';
        break;
      case 'gold':
        badgeStyle = 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-white shadow-md shadow-amber-500/25 ring-1 ring-amber-400';
        label = 'Gold';
        break;
      case 'platinum':
        badgeStyle = 'bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white shadow-lg shadow-indigo-500/25 ring-1 ring-indigo-400 animate-pulse';
        label = 'Platinum';
        break;
      default:
        return null;
    }

    return (
      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider ${badgeStyle}`}>
        {label}
      </span>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="flex items-center gap-2 group">
              <div className="bg-primary-500 p-2 rounded-xl text-white group-hover:bg-primary-600 transition-colors">
                <Bot size={28} />
              </div>
              <span className="font-fredoka text-2xl font-bold text-gray-800 tracking-wide">
                Robo <span className="text-primary-500">Mind</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            <a href="/#beranda" className="text-primary-600 font-bold border-b-2 border-primary-500 pb-1">{t('navbar.home')}</a>
            <a href="/#fitur-game" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">{t('navbar.features')}</a>
            <a href="/#skrining-awal" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">{t('navbar.screening')}</a>
            <a href="/#progress-anak" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">{t('navbar.progress')}</a>
            <a href="/#berlangganan" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">{t('navbar.pricing')}</a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={toggleLanguage} className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 font-bold text-sm transition-colors">
              {i18n.language.toUpperCase()}
            </button>
            {user ? (
              <div className="relative group">
                <img src={avatarUrl} alt="Profile" className="w-9 h-9 rounded-full border-2 border-primary-100 cursor-pointer hover:border-primary-500 transition-colors" />
                <div className="absolute right-0 top-12 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <p className="font-bold text-gray-800 font-outfit text-sm truncate">{displayName}</p>
                  <div className="mt-1">{renderBadge()}</div>
                  <hr className="my-2 border-gray-100" />
                  <button onClick={handleLogout} className="w-full text-left text-sm text-red-500 hover:text-red-700 font-medium px-2 py-1.5 rounded-lg hover:bg-red-50 transition-colors">{t('navbar.logout')}</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                {t('navbar.login')}
              </Link>
            )}
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#" 
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2.5 rounded-full font-medium shadow-md shadow-primary-500/30 hover:shadow-lg hover:shadow-primary-500/40 transition-all"
            >
              {t('navbar.start_screening')}
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <button onClick={toggleLanguage} className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 border border-gray-200 text-gray-600 font-bold text-xs">
              {i18n.language.toUpperCase()}
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-white border-b border-gray-100"
        >
          <div className="px-4 pt-2 pb-4 space-y-1">
            <a href="/#beranda" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-bold text-primary-600 bg-primary-50">{t('navbar.home')}</a>
            <a href="/#fitur-game" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50">{t('navbar.features')}</a>
            <a href="/#skrining-awal" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50">{t('navbar.screening')}</a>
            <a href="/#progress-anak" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50">{t('navbar.progress')}</a>
            <a href="/#berlangganan" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50">{t('navbar.pricing')}</a>
            <div className="pt-4 flex flex-col gap-2">
              {user ? (
                <>
                  <div className="flex items-center gap-3 p-2">
                    <img src={avatarUrl} alt="" className="w-8 h-8 rounded-full shrink-0" />
                    <span className="font-bold text-gray-800 font-outfit text-sm truncate">{displayName}</span>
                    {renderBadge()}
                  </div>
                  <button onClick={() => { setIsOpen(false); handleLogout(); }} className="block w-full text-center px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-full hover:bg-red-50">
                    {t('navbar.logout_acc')}
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-2 text-base font-medium text-gray-700 border border-gray-200 rounded-full hover:bg-gray-50">
                  {t('navbar.login')}
                </Link>
              )}
              <a href="#" onClick={() => setIsOpen(false)} className="block text-center px-4 py-2 text-base font-medium text-white bg-primary-500 rounded-full shadow-md">
                {t('navbar.start_screening')}
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
