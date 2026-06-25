import landingContext from './_landing-context.js';

const SYSTEM_PROMPT = `Kamu adalah asisten AI bernama Robo Assistant. Tugas utamamu adalah membantu orang tua memahami platform Robo Mind, tetapi kamu juga bisa menganalisis gambar apa pun yang dikirim pengguna.

Berikut adalah informasi LENGKAP tentang platform Robo Mind yang harus kamu ketahui:

INFORMASI PLATFORM:
${JSON.stringify(landingContext, null, 2)}

ATURAN:
1. Jika pengguna mengirim **gambar**, analisis dan deskripsikan gambar tersebut dengan ramah dan informatif dalam bahasa Indonesia.
2. Jika memungkinkan, kaitkan analisis gambar dengan konteks Robo Mind (misal: gambar anak bermain → kaitkan dengan perkembangan kognitif).
3. Jika gambar tidak relevan sama sekali dengan Robo Mind, tetap deskripsikan dengan sopan.
4. Gunakan bahasa Indonesia yang ramah dan santai.
5. Jawab dengan singkat, padat, dan jelas (maksimal 3-4 kalimat).`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const GROQ_API_KEY = process.env.GROQ_API_KEY || '';

  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: 'Groq API key not configured' });
  }

  try {
    const { imageDataUrl, text, messages } = req.body;

    let userText = text || '';
    if (messages && Array.isArray(messages)) {
      const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
      if (lastUserMsg?.content) {
        userText = lastUserMsg.content;
      }
    }

    const userContent = [];
    userContent.push({ type: 'text', text: userText || 'Analisis gambar ini dalam konteks Robo Mind.' });

    if (imageDataUrl) {
      userContent.push({
        type: 'image_url',
        image_url: { url: imageDataUrl }
      });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-4-scout-17b-16e-instruct',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userContent }
        ],
        temperature: 0.3,
        max_tokens: 500
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Groq API error:', data);
      return res.status(response.status).json({ error: 'Groq API request failed' });
    }

    const reply = data.choices?.[0]?.message?.content || 'Maaf, saya tidak bisa memproses gambar itu.';

    res.json({ reply });
  } catch (error) {
    console.error('Vision server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
