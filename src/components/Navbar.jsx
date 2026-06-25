import { useState } from 'react';
import { Menu, X, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'id' ? 'en' : 'id';
    i18n.changeLanguage(nextLang);
  };

  const handleLogin = (provider) => {
    setUser({
      name: 'Orang Tua Hebat',
      avatar: 'https://ui-avatars.com/api/?name=Orang+Tua&background=0D8ABC&color=fff&rounded=true'
    });
    setIsLoginOpen(false);
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
              <div className="flex items-center gap-3 cursor-pointer group">
                <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full border-2 border-primary-100 group-hover:border-primary-500 transition-colors" />
                <span className="font-bold text-gray-800 font-outfit">{user.name}</span>
                <button onClick={() => setUser(null)} className="text-xs text-red-500 hover:text-red-700 ml-2 font-bold px-2 py-1 bg-red-50 rounded-md">{t('navbar.logout')}</button>
              </div>
            ) : (
              <button onClick={() => setIsLoginOpen(true)} className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                {t('navbar.login')}
              </button>
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
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full" />
                    <span className="font-bold text-gray-800 font-outfit">{user.name}</span>
                  </div>
                  <button onClick={() => { setIsOpen(false); setUser(null); }} className="block w-full text-center px-4 py-2 text-base font-medium text-red-600 border border-red-200 rounded-full hover:bg-red-50">
                    {t('navbar.logout_acc')}
                  </button>
                </div>
              ) : (
                <button onClick={() => { setIsOpen(false); setIsLoginOpen(true); }} className="block w-full text-center px-4 py-2 text-base font-medium text-gray-700 border border-gray-200 rounded-full hover:bg-gray-50">
                  {t('navbar.login')}
                </button>
              )}
              <a href="#" onClick={() => setIsOpen(false)} className="block text-center px-4 py-2 text-base font-medium text-white bg-primary-500 rounded-full shadow-md">
                {t('navbar.start_screening')}
              </a>
            </div>
          </div>
        </motion.div>
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 w-screen h-screen z-[9999] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setIsLoginOpen(false)}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white/95 backdrop-blur-xl w-full max-w-md rounded-[2rem] shadow-2xl p-8 overflow-hidden border border-white/50"
          >
            <button onClick={() => setIsLoginOpen(false)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 bg-gray-100/50 hover:bg-gray-200 p-2.5 rounded-full transition-colors">
              <X size={20} />
            </button>

            <div className="text-center mb-8 mt-2">
              <div className="bg-gradient-to-br from-primary-400 to-primary-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-primary-500/30">
                <Bot size={40} />
              </div>
              <h2 className="text-3xl font-fredoka font-bold text-gray-900 mb-2">{t('navbar.welcome')}</h2>
              <p className="text-gray-500 font-outfit text-sm">{t('navbar.login_desc')}</p>
            </div>

            <div className="space-y-3.5">
              <button onClick={() => handleLogin('Google')} className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white border-2 border-gray-100 rounded-2xl hover:bg-gray-50 hover:border-gray-200 hover:shadow-md transition-all font-outfit font-bold text-gray-700">
                <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="Google" className="w-5 h-5" />
                {t('navbar.continue_google')}
              </button>
              
              <button onClick={() => handleLogin('Apple')} className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-gray-900 text-white rounded-2xl hover:bg-black hover:shadow-lg hover:shadow-gray-900/30 transition-all font-outfit font-bold">
                <img src="https://cdn-icons-png.flaticon.com/512/0/747.png" alt="Apple" className="w-5 h-5 invert" />
                {t('navbar.continue_apple')}
              </button>

              <button onClick={() => handleLogin('Yahoo')} className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-[#6001D2] text-white rounded-2xl hover:bg-[#4a00a3] hover:shadow-lg hover:shadow-[#6001D2]/30 transition-all font-outfit font-bold">
                <img src="https://cdn-icons-png.flaticon.com/512/888/888880.png" alt="Yahoo" className="w-5 h-5 invert" />
                {t('navbar.continue_yahoo')}
              </button>

              <div className="relative flex items-center py-5">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink-0 mx-4 text-gray-400 font-outfit text-xs uppercase font-bold tracking-wider">{t('navbar.or')}</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <button onClick={() => handleLogin('Email')} className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white border-2 border-gray-100 rounded-2xl hover:bg-gray-50 hover:border-gray-200 hover:shadow-md transition-all font-outfit font-bold text-gray-700">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                {t('navbar.continue_email')}
              </button>
            </div>
            
            <p className="text-center text-xs text-gray-400 font-outfit mt-8 font-medium">
              Dengan masuk, Anda menyetujui <a href="#" className="text-primary-600 hover:underline">Syarat Ketentuan</a> dan <a href="#" className="text-primary-600 hover:underline">Kebijakan Privasi</a> kami.
            </p>
          </motion.div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
