import { Check, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Pricing = () => {
  const { i18n } = useTranslation();
  return (
    <section id="berlangganan" className="py-14 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-48 sm:h-64 bg-gradient-to-b from-primary-50 to-white z-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 font-fredoka mb-3 sm:mb-4">
            {i18n.language === 'en' ? 'Subscribe & Optimize Potential' : 'Berlangganan & Optimalkan Potensi'}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 font-outfit px-2">
            {i18n.language === 'en' ? 'Choose the package that suits your child\'s evaluation and guidance needs.' : 'Pilih paket yang sesuai dengan kebutuhan evaluasi dan bimbingan anak Anda.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl sm:text-2xl font-bold font-fredoka text-gray-900 mb-2">Free Tier</h3>
            <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-6">Rp 0 <span className="text-sm sm:text-base font-medium text-gray-500">/{i18n.language === 'en' ? 'forever' : 'selamanya'}</span></div>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{i18n.language === 'en' ? 'Early access to get to know the world of basic logic.' : 'Akses awal untuk mengenal dunia logika dasar.'}</p>
            
            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <li className="flex items-start gap-3">
                <Check size={18} className="sm:size-[20] text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-gray-600">{i18n.language === 'en' ? 'Access to basic game modules' : 'Akses modul game dasar'}</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={18} className="sm:size-[20] text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-gray-600">{i18n.language === 'en' ? 'Monthly general development chart' : 'Diagram perkembangan umum bulanan'}</span>
              </li>
              <li className="flex items-start gap-3 opacity-40">
                <Check size={18} className="sm:size-[20] text-gray-400 shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-gray-400">{i18n.language === 'en' ? 'Weekly AI-powered analysis' : 'Analisis bertenaga AI mingguan'}</span>
              </li>
              <li className="flex items-start gap-3 opacity-40">
                <Check size={18} className="sm:size-[20] text-gray-400 shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-gray-400">{i18n.language === 'en' ? 'Expert consultation via AI Chatbot' : 'Konsultasi ahli via Chatbot AI'}</span>
              </li>
            </ul>
            
            <button className="w-full py-3 sm:py-3.5 px-4 rounded-full font-bold text-sm sm:text-base text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors">
              {i18n.language === 'en' ? 'Start for Free' : 'Mulai Gratis'}
            </button>
          </div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-800 shadow-2xl shadow-primary-500/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-gradient-to-l from-primary-500 to-secondary-500 text-white text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-bl-xl uppercase tracking-wider">
              {i18n.language === 'en' ? 'Most Popular' : 'Paling Populer'}
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <Star size={20} className="sm:size-[24] text-secondary-500 fill-secondary-500" />
              <h3 className="text-xl sm:text-2xl font-bold font-fredoka text-white">Premium SaaS</h3>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white mb-4 sm:mb-6">Rp 99.000 <span className="text-sm sm:text-base font-medium text-gray-400">/{i18n.language === 'en' ? 'month' : 'bulan'}</span></div>
            <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">{i18n.language === 'en' ? 'Full assistance to maximize your little one\'s potential.' : 'Pendampingan penuh untuk memaksimalkan potensi si kecil.'}</p>
            
            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <li className="flex items-start gap-3">
                <Check size={18} className="sm:size-[20] text-primary-400 shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-gray-300">{i18n.language === 'en' ? 'Access to all interactive game modules' : 'Akses ke semua modul game interaktif'}</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={18} className="sm:size-[20] text-primary-400 shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-gray-300">{i18n.language === 'en' ? 'Weekly in-depth AI-powered analysis' : 'Analisis mendalam bertenaga AI secara mingguan'}</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={18} className="sm:size-[20] text-primary-400 shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-gray-300">{i18n.language === 'en' ? '24/7 AI Chatbot consultation regarding child metrics' : 'Konsultasi Chatbot AI 24/7 terkait metrik anak'}</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={18} className="sm:size-[20] text-primary-400 shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-gray-300">{i18n.language === 'en' ? 'Real activity recommendations from Child Psychologists' : 'Rekomendasi aktivitas nyata dari Psikolog Anak'}</span>
              </li>
            </ul>
            
            <button className="w-full py-3 sm:py-3.5 px-4 rounded-full font-bold text-sm sm:text-base text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 transition-colors shadow-lg shadow-primary-500/25">
              {i18n.language === 'en' ? 'Subscribe Now' : 'Langganan Sekarang'}
            </button>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Pricing;
