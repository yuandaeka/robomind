import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import { Play, Users, Brain, Shield, Rocket, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const FeaturesPage = () => {
  const { i18n } = useTranslation();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      id: 1,
      title: "Echoes of Choice",
      icon: <Users size={32} className="text-blue-500" />,
      desc: i18n.language === 'en' 
        ? "Tests empathy and caring. Children watch a bullying scenario, then choose how the story unfolds."
        : "Melihat seberapa besar rasa kepedulian (empati). Anak melihat skenario bully, lalu disuruh milih skenario cerita.",
      img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&auto=format&fit=crop&q=80",
      color: "bg-blue-50",
      url: "/games/echoes.html"
    },
    {
      id: 2,
      title: "Agen Fakta",
      icon: <Shield size={32} className="text-green-500" />,
      desc: i18n.language === 'en'
        ? "Trains critical thinking by identifying whether given information is fact or hoax."
        : "Melatih berpikir kritis untuk melihat informasi ini fakta atau hoax.",
      img: "https://images.unsplash.com/photo-1558021211-6d1403321394?w=800&auto=format&fit=crop&q=80",
      color: "bg-green-50",
      url: "/games/fakta.html"
    },
    {
      id: 3,
      title: "Ksatria Angka",
      icon: <Target size={32} className="text-red-500" />,
      desc: i18n.language === 'en'
        ? "Tests basic math skills and thinking under pressure against time (Robo vs Robot)."
        : "Menguji kemampuan matematika dasar dan berpikir di bawah tekanan karena dikejar waktu (Robo VS Robot).",
      img: "https://images.unsplash.com/photo-1632516643720-e7f0d0e1848b?w=800&auto=format&fit=crop&q=80",
      color: "bg-red-50",
      url: "/games/ksatria.html"
    },
    {
      id: 4,
      title: "Adu Cepat Hitung",
      icon: <Play size={32} className="text-purple-500" />,
      desc: i18n.language === 'en'
        ? "Multiplayer version of Ksatria Angka where kids can compete with their friends."
        : "Sama seperti Ksatria Angka, namun dalam mode multiplayer untuk bermain bersama teman.",
      img: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&auto=format&fit=crop&q=80",
      color: "bg-purple-50",
      url: "/games/aducepat.html"
    },
    {
      id: 5,
      title: "Pemburu Ilmu",
      icon: <Rocket size={32} className="text-orange-500" />,
      desc: i18n.language === 'en'
        ? "Trains focus and basic knowledge. A platformer game where points are planets, organs, etc."
        : "Melatih fokus konsentrasi dan pengetahuan dasar. Teknis seperti Mario Bros tapi pointnya diganti planet, organ, dll.",
      img: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&auto=format&fit=crop&q=80",
      color: "bg-orange-50",
      url: "/games/pemburu.html"
    },
    {
      id: 6,
      title: "Pinch and Drop",
      icon: <Brain size={32} className="text-teal-500" />,
      desc: i18n.language === 'en'
        ? "Tests basic knowledge and fine motor skills by dragging scattered numbers to solve math problems."
        : "Mengetes pengetahuan dasar dan motorik halus. Terdapat soal hitung-hitungan di mana angka tersebar dan harus diambil sesuai jawaban.",
      img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&auto=format&fit=crop&q=80",
      color: "bg-teal-50",
      url: "/games/pinch.html"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-outfit bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 font-fredoka mb-6 uppercase tracking-tight">
              {i18n.language === 'en' ? 'All Game Features' : 'Semua Fitur Game'}
            </h1>
            <p className="text-lg text-gray-600">
              {i18n.language === 'en' 
                ? 'Explore the variety of educational games we provide to train logic, empathy, and your child\'s basic skills.' 
                : 'Eksplorasi berbagai game edukasi yang kami sediakan untuk melatih logika, empati, dan keterampilan dasar anak Anda.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                  <img 
                    src={feature.img} 
                    alt={feature.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className={`absolute top-4 left-4 p-2 rounded-xl backdrop-blur-md bg-white/80 shadow-sm`}>
                    {feature.icon}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 font-fredoka mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                    {feature.desc}
                  </p>
                  <a href={feature.url} className="mt-6 w-full py-3 px-4 bg-gray-100 hover:bg-primary-500 hover:text-white text-gray-800 font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                    <Play size={16} /> {i18n.language === 'en' ? 'Play Demo' : 'Mainkan Demo'}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FeaturesPage;
