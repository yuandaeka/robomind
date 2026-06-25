import { Bot } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { i18n } = useTranslation();
  return (
    <footer className="bg-slate-900 pt-10 sm:pt-16 pb-6 sm:pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 mb-10 sm:mb-16">
          
          <div className="col-span-2 sm:col-span-2 lg:col-span-2">
            <a href="#" className="flex items-center gap-2 group mb-4 sm:mb-6 inline-flex">
              <div className="bg-primary-500 p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-white">
                <Bot size={22} className="sm:size-[28]" />
              </div>
              <span className="font-fredoka text-xl sm:text-2xl font-bold text-white tracking-wide">
                Robo <span className="text-primary-500">Mind</span>
              </span>
            </a>
            <p className="text-slate-400 font-outfit mb-6 sm:mb-8 max-w-sm leading-relaxed text-sm sm:text-base">
              {i18n.language === 'en' ? 'Building the future through interactive AI educational games. Making learning coding and robotics fun for children around the world.' : 'Membangun masa depan melalui game edukasi AI interaktif. Menjadikan proses belajar coding dan robotika menyenangkan bagi anak-anak di seluruh dunia.'}
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-[10px] sm:text-sm text-slate-400 hover:bg-primary-500 hover:text-white transition-all" aria-label="Facebook">
                FB
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-[10px] sm:text-sm text-slate-400 hover:bg-primary-500 hover:text-white transition-all" aria-label="Instagram">
                IG
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-[10px] sm:text-sm text-slate-400 hover:bg-primary-500 hover:text-white transition-all" aria-label="Twitter">
                X
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-[10px] sm:text-sm text-slate-400 hover:bg-primary-500 hover:text-white transition-all" aria-label="YouTube">
                YT
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-fredoka font-bold text-sm sm:text-lg mb-4 sm:mb-6">{i18n.language === 'en' ? 'Our Programs' : 'Program Kami'}</h4>
            <ul className="space-y-2 sm:space-y-4">
              <li><a href="#" className="text-slate-400 hover:text-primary-400 font-outfit transition-colors text-xs sm:text-sm">{i18n.language === 'en' ? '1:1 Private Class' : 'Kelas Privat 1:1'}</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary-400 font-outfit transition-colors text-xs sm:text-sm">{i18n.language === 'en' ? 'Playgroup Class' : 'Kelas Kelompok Bermain'}</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary-400 font-outfit transition-colors text-xs sm:text-sm">{i18n.language === 'en' ? 'School Partnership' : 'Kemitraan Sekolah'}</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary-400 font-outfit transition-colors text-xs sm:text-sm">{i18n.language === 'en' ? 'Special Curriculum' : 'Kurikulum Spesial'}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-fredoka font-bold text-sm sm:text-lg mb-4 sm:mb-6">{i18n.language === 'en' ? 'Learning Resources' : 'Sumber Belajar'}</h4>
            <ul className="space-y-2 sm:space-y-4">
              <li><a href="#" className="text-slate-400 hover:text-primary-400 font-outfit transition-colors text-xs sm:text-sm">{i18n.language === 'en' ? 'Free Modules' : 'Modul Gratis'}</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary-400 font-outfit transition-colors text-xs sm:text-sm">{i18n.language === 'en' ? 'Coding Glossary' : 'Daftar Istilah Coding'}</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary-400 font-outfit transition-colors text-xs sm:text-sm">{i18n.language === 'en' ? 'Parents Guide' : 'Panduan Orang Tua'}</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary-400 font-outfit transition-colors text-xs sm:text-sm">{i18n.language === 'en' ? 'Blog Articles' : 'Artikel Blog'}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-fredoka font-bold text-sm sm:text-lg mb-4 sm:mb-6">{i18n.language === 'en' ? 'Company' : 'Perusahaan'}</h4>
            <ul className="space-y-2 sm:space-y-4">
              <li><a href="#" className="text-slate-400 hover:text-primary-400 font-outfit transition-colors text-xs sm:text-sm">{i18n.language === 'en' ? 'Vision & Mission' : 'Visi Misi'}</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary-400 font-outfit transition-colors text-xs sm:text-sm">{i18n.language === 'en' ? 'Psychologists & Experts Team' : 'Tim Psikolog & Ahli'}</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary-400 font-outfit transition-colors text-xs sm:text-sm">{i18n.language === 'en' ? 'Careers' : 'Karir'}</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary-400 font-outfit transition-colors text-xs sm:text-sm">{i18n.language === 'en' ? 'Contact Us' : 'Hubungi Kami'}</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-6 sm:pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-slate-500 font-outfit text-[10px] sm:text-xs md:text-sm text-center md:text-left">
            &copy; 2026 Robo Mind. {i18n.language === 'en' ? 'All rights reserved.' : 'Hak Cipta Dilindungi.'}
          </p>
          <div className="flex gap-4 sm:gap-6">
            <a href="#" className="text-slate-500 hover:text-white font-outfit text-[10px] sm:text-xs md:text-sm transition-colors">{i18n.language === 'en' ? 'Terms of Service' : 'Syarat & Ketentuan'}</a>
            <a href="#" className="text-slate-500 hover:text-white font-outfit text-[10px] sm:text-xs md:text-sm transition-colors">{i18n.language === 'en' ? 'Privacy Policy' : 'Kebijakan Privasi'}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
