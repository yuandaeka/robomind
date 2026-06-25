const landingContext = {
  brand: {
    name: "Robo Mind",
    tagline: "Membangun masa depan melalui game edukasi AI interaktif",
    description: "Platform edukasi yang mengajarkan coding dan robotika kepada anak-anak melalui game interaktif berbasis AI."
  },
  navbar: {
    links: ["Beranda", "Fitur Game", "Skrining Awal", "Progress Anak", "Berlangganan"],
    actions: ["Masuk Akun", "Mulai Skrining Gratis"]
  },
  hero: {
    slides: [
      {
        tag: "✨ PLATFORM EDUKASI MASA DEPAN",
        title: "Asah Potensi Kognitif & Logika Anak",
        subtitle: "Hubungkan game anak Anda, pantau metrik perkembangannya secara real-time, dan dapatkan rekomendasi spesifik dari psikolog anak."
      },
      {
        tag: "🤖 TEKNOLOGI GAME AI",
        title: "Petualangan Seru Penuh Tantangan",
        subtitle: "Bermain sambil mengasah logika coding. Biarkan imajinasi si kecil terbang tinggi tanpa batas."
      },
      {
        tag: "📊 PANTUAN REAL-TIME",
        title: "Lihat Perkembangan Secara Langsung",
        subtitle: "Akses dashboard eksklusif untuk melacak kompetensi bahasa, fokus, dan pemecahan masalah."
      }
    ],
    cta: ["Coba Skrining Awal", "Tonton Demo", "Tanya Chatbot", "Progress Anak"]
  },
  gameSlider: {
    title: "Eksplorasi Fitur Game",
    games: [
      { title: "MODUL LOGIKA ROBOT", subtitle: "Petualangan coding dasar." },
      { title: "MISI MATEMATIKA KREATIF", subtitle: "Penyelesaian kasus numerik." },
      { title: "TANTANGAN PROBLEM SOLVING", subtitle: "Mengasah ketangkasan otak kiri." }
    ]
  },
  screeningPillars: {
    title: "3 Pilar Skrining Awal",
    description: "Kenali profil belajar unik anak Anda sebelum mereka memulai petualangan edukasi bersama Robo Mind.",
    pillars: [
      {
        title: "Evaluasi Kognitif Dasar",
        desc: "Pemetaan logika awal untuk menentukan tingkat kesulitan dasar game (dynamic difficulty adaptive)."
      },
      {
        title: "Identifikasi Gaya Belajar",
        desc: "Mengetahui apakah anak condong ke gaya Visual, Auditori, atau Kinestetik."
      },
      {
        title: "Pemetaan Minat & Bakat",
        desc: "Skrining psikologi dasar interaktif untuk melihat potensi terpendam anak."
      }
    ]
  },
  parentDashboard: {
    title: "Parent Dashboard & Progress",
    description: "Pantau metrik perkembangan anak Anda secara real-time dan lihat evaluasi kompetensi mereka.",
    metrics: {
      kompetensi: ["Logika", "Kreativitas", "Bahasa", "Fokus", "Pemecahan Masalah"],
      level: ["Beginner", "Intermediate", "Advanced"],
      stats: {
        beginner: { keterampilan: 5, aktivitas: "10+", kurikulum: "5h" },
        intermediate: { keterampilan: 12, aktivitas: "40+", kurikulum: "20h" },
        advanced: { keterampilan: 24, aktivitas: "100+", kurikulum: "50h+" }
      }
    }
  },
  pricing: {
    title: "Berlangganan & Optimalkan Potensi",
    description: "Pilih paket yang sesuai dengan kebutuhan evaluasi dan bimbingan anak Anda.",
    plans: [
      {
        name: "Free Tier",
        price: "Rp 0 /selamanya",
        desc: "Akses awal untuk mengenal dunia logika dasar.",
        features: [
          "Akses modul game dasar",
          "Diagram perkembangan umum bulanan"
        ]
      },
      {
        name: "Premium SaaS",
        price: "Rp 99.000 /bulan",
        desc: "Pendampingan penuh untuk memaksimalkan potensi si kecil.",
        features: [
          "Akses ke semua modul game interaktif",
          "Analisis mendalam bertenaga AI secara mingguan",
          "Konsultasi Chatbot AI 24/7 terkait metrik anak",
          "Rekomendasi aktivitas nyata dari Psikolog Anak"
        ]
      }
    ]
  },
  footer: {
    description: "Membangun masa depan melalui game edukasi AI interaktif. Menjadikan proses belajar coding dan robotika menyenangkan bagi anak-anak di seluruh dunia.",
    programs: ["Kelas Privat 1:1", "Kelas Kelompok Bermain", "Kemitraan Sekolah", "Kurikulum Spesial"],
    resources: ["Modul Gratis", "Daftar Istilah Coding", "Panduan Orang Tua", "Artikel Blog"],
    company: ["Visi Misi", "Tim Psikolog & Ahli", "Karir", "Hubungi Kami"]
  }
};

export default landingContext;
