export const generateChatResponse = async (messages) => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('API Error:', data.error);
      throw new Error('Gagal mengambil respon dari API');
    }

    return data.reply || 'Maaf, saya tidak bisa menjawab pertanyaan itu.';
  } catch (error) {
    console.error('API Request Error:', error);
    return 'Maaf, saya sedang mengalami kendala jaringan atau server API sedang sibuk. Silakan coba lagi nanti ya.';
  }
};
