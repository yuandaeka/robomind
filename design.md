# Product Design Specification: Robo Mind Landing Page
**Project Name:** Robo Mind
**Target Audience:** Parents (Primary Decision Makers), Elementary School Kids (End Users)
**Tech Stack Framework:** React + Vite
**Styling & UI Library:** Tailwind CSS + Framer Motion + Chart.js (react-chartjs-2) + Swiper.js
**Design Philosophy:** Kids-friendly, Interactive, Vibrant, and SaaS Trustworthy

---

## 1. Global Visual & Style Guides
* **Color Palette:**
  * Primary (Brand/Robot): Bright Cyan / Cyber Blue (`#06b6d4` - `#3b82f6`)
  * Secondary (Kids Friendly): Playful Orange (`#f97316`) & Lime Green (`#84cc16`)
  * Backgrounds: Light Soft Cream / Off-White (`#fafaf9`) & Dark Navy untuk Footer (`#0f172a`)
* **Typography:**
  * Headings / Playful Text: `Fredoka` (Rounded, clean, and highly friendly)
  * Body text / Data Dashboard: `Outfit` (Modern, readable, high tech feel)

---

## 2. Component Structure & Section Breakdown

### Component 2.1: Header & Navigation Bar (`<Navbar />`)
* **Layout:** Responsive Flexbox (Sticky on Scroll)
* **Logo Wrapper:** Text/Icon "ROBO MIND" dengan ikon robot futuristik mini.
* **Menus:**
  * Beranda
  * Fitur Game (Swipeable)
  * Skrining Awal (3 Pillars)
  * Progress Anak (Parent Dashboard)
  * Berlangganan (SaaS Pricing)
* **Actions:** Tombol `Masuk Akun` dan Call-To-Action (CTA) Utama `Mulai Skrining Gratis`.

### Component 2.2: Hero Section (`<Hero />`)
* **Jargon Utama (Headline):** "Asah Potensi Kognitif & Logika Anak Lewat Petualangan Game Edukasi Berbasis AI"
* **Sub-headline:** "Hubungkan game anak Anda, pantau metrik perkembangannya secara real-time, dan dapatkan rekomendasi spesifik dari psikolog anak."
* **Primary CTA:** Button `Coba Skrining Awal` dengan efek animasi mikro membal (*bounce-on-hover*).
* **Visual Right Side:** Gambar/Mockup interaktif gabungan: Karakter robot pendamping anak yang memiliki animasi melayang (*floating/levitating animation*) menggunakan Framer Motion, bersandingan dengan potongan elemen *Spider Chart*.

### Component 2.3: Game Feature Carousel (`<GameSlider />`)
* **Description:** Menggantikan kisi program statis lama menjadi slider interaktif berbasis komponen `Swiper.js`.
* **Interactivity:** Bisa di-swipe geser oleh user untuk melihat keunggulan fitur di dalam game.
* **Cards Content (Contoh 3 Slide):**
  1. *Modul Logika Robot:* Petualangan teka-teki logika coding dasar untuk anak SD.
  2. *Misi Matematika Kreatif:* Menyelesaikan kasus numerik dengan visualisasi petualangan interaktif.
  3. *Tantangan Problem Solving:* Mengasah ketangkasan otak kiri anak melalui penyelesaian puzzle adaptif.
* **Animation:** Kartu yang berada di posisi tengah (*active slide*) mendapatkan efek *scale-up* 105% dan bayangan bercahaya halus (*glow effect*).

### Component 2.4: 3 Core Skrining Awal (`<ScreeningPillars />`)
* **Description:** Blok informasi 3 pilar utama kuesioner awal kompetensi anak sebelum bermain game.
* **Layout:** 3-Column Responsive Grid.
* **The Pillars:**
  1. **Evaluasi Kognitif Dasar:** Pemetaan logika awal untuk menentukan tingkat kesulitan dasar game (*dynamic difficulty adaptive*).
  2. **Identifikasi Gaya Belajar:** Mengetahui apakah anak condong ke gaya Visual, Auditori, atau Kinestetik.
  3. **Pemetaan Minat & Bakat:** Skrining psikologi dasar interaktif untuk melihat potensi terpendam anak.
* **Animation:** Efek *Staggered Fade-In* (muncul bergantian satu per satu dari kiri ke kanan saat layar di-scroll).

### Component 2.5: Parent Dashboard & Progress Representation (`<ParentDashboard />`)
* **Description:** Seksi visualisasi utama yang merepresentasikan akun orang tua yang terkoneksi dengan game.
* **Left Content (Robot Progress & Metrics):**
  * Tampilan **Visual Robot Progress**: Karakter robot pintar yang visualnya adaptif/berubah sesuai kemajuan level anak (Gunakan Framer Motion untuk transisi pergantian *state* komponen robot).
  * 3 Papan Skor Statis: *Keterampilan Target*, *Ukuran Kurikulum*, dan *Aktivitas Interaktif*.
* **Right Content (Spider Chart Layout):**
  * Implementasi **Diagram Laba-Laba (Radar Chart)** menggunakan `react-chartjs-2`.
  * Menampilkan 5 sumbu kompetensi anak: Logika, Kreativitas, Bahasa, Fokus, dan Pemecahan Masalah.
  * *Animation:* Diagram akan menarik garis tumbuh secara animatif dari nilai 0 menuju nilai kompetensi asli saat seksi ini terlihat di viewport.

### Component 2.6: SaaS Subscription Model (`<Pricing />`)
* **Description:** Penawaran skema model bisnis SaaS subscription untuk analitik mendalam.
* **Packages:**
  * *Free Tier:* Akses game dasar, diagram perkembangan umum bulanan.
  * *Premium SaaS Tier:* Analisis mendalam bertenaga AI secara mingguan, konsultasi chatbot ahli, dan saran tindak lanjut spesifik/rekomendasi aktivitas nyata dari Psikolog Anak untuk mengoptimalkan potensi anak.

### Component 2.7: AI Chatbot Widget (`<ChatbotWidget />`)
* **Description:** Floating button di pojok kanan bawah halaman berbentuk balon teks robot pintar.
* **Functionality:** Ketika diklik, akan membuka jendela chat interaktif di mana orang tua bisa menanyakan performa anak atau tips belajar umum yang ditenagai oleh Gemini API.