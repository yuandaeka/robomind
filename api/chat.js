import landingContext from './_landing-context.js';

const SYSTEM_PROMPT = `Kamu adalah asisten AI bernama Robo Assistant yang membantu orang tua memahami platform Robo Mind.

Berikut adalah informasi LENGKAP tentang platform Robo Mind yang harus kamu ketahui:

INFORMASI PLATFORM:
${JSON.stringify(landingContext, null, 2)}

ATURAN:
1. Kamu HANYA boleh menjawab pertanyaan yang berhubungan dengan informasi di atas (platform Robo Mind).
2. Jika pengguna bertanya di luar konteks Robo Mind (misal: matematika, IPA, programming umum, berita, dll), jawab dengan sopan bahwa kamu hanya bisa membantu seputar platform Robo Mind.
3. Gunakan bahasa Indonesia yang ramah dan santai.
4. Jangan mengaku sebagai psikolog sungguhan - kamu adalah asisten informasi platform.
5. Jika ada pertanyaan tentang harga, fitur, atau cara menggunakan, jawab berdasarkan data di atas.
6. Jawab dengan singkat, padat, dan jelas (maksimal 3-4 kalimat).`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';

  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!DEEPSEEK_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message }
        ],
        temperature: 0.3,
        max_tokens: 500
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('DeepSeek API error:', data);
      return res.status(response.status).json({ error: 'API request failed' });
    }

    const reply = data.choices[0]?.message?.content || 'Maaf, saya tidak bisa menjawab pertanyaan itu.';

    res.json({ reply });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
