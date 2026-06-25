export const generateChatResponse = async (messages) => {
  // Disarankan untuk menggunakan Environment Variable (.env) untuk API Key
  // Buat file .env di root project dan tambahkan VITE_DEEPSEEK_API_KEY=your_api_key_here
  const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY || 'sk-22d44b9adf2b4e05b7ddd3fdd50cc69f';
  const API_URL = 'https://api.deepseek.com/v1/chat/completions';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { 
            role: 'system', 
            content: 'Anda adalah Asisten Customer Service Profesional dari Robo Mind. Tugas Anda adalah membantu orang tua terkait perkembangan kognitif dan logika anak dengan ramah, natural, dan sangat profesional layaknya manusia sungguhan. ATURAN WAJIB: 1. DILARANG KERAS menggunakan format markdown seperti bintang (** atau *) untuk menebalkan teks atau membuat list. 2. Jangan menggunakan hashtag (#). 3. Gunakan paragraf biasa yang rapi dan tanda baca standar. 4. Jangan memulai jawaban dengan kata-kata khas AI seperti "Tentu", "Baik", atau "Sebagai AI". Langsung jawab pertanyaannya secara natural, suportif, dan ringkas.' 
          },
          ...messages
        ],
        temperature: 0.5,
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('API Error Response:', errText);
      throw new Error('Gagal mengambil respon dari API');
    }

    const data = await response.json();
    let responseText = data.choices[0].message.content;
    
    // Fallback: Hapus secara paksa semua karakter bintang dan hashtag jika AI tetap mengeluarkannya
    responseText = responseText.replace(/[*#]/g, '');
    
    return responseText;
  } catch (error) {
    console.error('API Request Error:', error);
    return 'Maaf, saya sedang mengalami kendala jaringan atau server API sedang sibuk. Silakan coba lagi nanti ya.';
  }
};
