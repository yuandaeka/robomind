import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import landingContext from './api/_landing-context.js'

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

const VISION_SYSTEM_PROMPT = `Kamu adalah asisten AI bernama Robo Assistant. Tugas utamamu adalah membantu orang tua memahami platform Robo Mind, tetapi kamu juga bisa menganalisis gambar apa pun yang dikirim pengguna.

Berikut adalah informasi LENGKAP tentang platform Robo Mind yang harus kamu ketahui:

INFORMASI PLATFORM:
${JSON.stringify(landingContext, null, 2)}

ATURAN:
1. Jika pengguna mengirim **gambar**, analisis dan deskripsikan gambar tersebut dengan ramah dan informatif dalam bahasa Indonesia.
2. Jika memungkinkan, kaitkan analisis gambar dengan konteks Robo Mind (misal: gambar anak bermain → kaitkan dengan perkembangan kognitif).
3. Jika gambar tidak relevan sama sekali dengan Robo Mind, tetap deskripsikan dengan sopan.
4. Gunakan bahasa Indonesia yang ramah dan santai.
5. Jawab dengan singkat, padat, dan jelas (maksimal 3-4 kalimat).`;

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'chat-api',
        configureServer(server) {
          server.middlewares.use('/api/chat', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.end(JSON.stringify({ error: 'Method not allowed' }));
              return;
            }

            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', async () => {
              try {
                const { message, messages } = JSON.parse(body);

                const apiKey = env.DEEPSEEK_API_KEY || '';
                if (!apiKey) {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: 'API key not configured' }));
                  return;
                }

                let finalMessages;
                if (messages && Array.isArray(messages)) {
                  finalMessages = [
                    { role: 'system', content: SYSTEM_PROMPT },
                    ...messages
                  ];
                } else if (message && typeof message === 'string') {
                  finalMessages = [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: message }
                  ];
                } else {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ error: 'Message or messages required' }));
                  return;
                }

                const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                  },
                  body: JSON.stringify({
                    model: 'deepseek-chat',
                    messages: finalMessages,
                    temperature: 0.3,
                    max_tokens: 500
                  })
                });

                const data = await response.json();

                if (!response.ok) {
                  console.error('DeepSeek error:', data);
                  res.statusCode = response.status;
                  res.end(JSON.stringify({ error: 'API request failed' }));
                  return;
                }

                const reply = data.choices[0]?.message?.content || 'Maaf, saya tidak bisa menjawab pertanyaan itu.';
                res.end(JSON.stringify({ reply }));
              } catch (err) {
                console.error('Chat error:', err);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Internal server error' }));
              }
            });
          });

          server.middlewares.use('/api/chat-vision', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.end(JSON.stringify({ error: 'Method not allowed' }));
              return;
            }

            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', async () => {
              try {
                const { imageDataUrl, text, messages } = JSON.parse(body);

                const groqKey = env.GROQ_API_KEY || '';
                if (!groqKey) {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: 'Groq API key not configured' }));
                  return;
                }

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
                    'Authorization': `Bearer ${groqKey}`
                  },
                  body: JSON.stringify({
                    model: 'meta-llama/llama-4-scout-17b-16e-instruct',
                    messages: [
                      { role: 'system', content: VISION_SYSTEM_PROMPT },
                      { role: 'user', content: userContent }
                    ],
                    temperature: 0.3,
                    max_tokens: 500
                  })
                });

                const data = await response.json();

                if (!response.ok) {
                  console.error('Groq error:', data);
                  res.statusCode = response.status;
                  res.end(JSON.stringify({ error: 'Groq API request failed' }));
                  return;
                }

                const reply = data.choices?.[0]?.message?.content || 'Maaf, saya tidak bisa memproses gambar itu.';
                res.end(JSON.stringify({ reply }));
              } catch (err) {
                console.error('Vision error:', err);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Internal server error' }));
              }
            });
          });
        }
      }
    ],
    server: {
      port: 3000,
      strictPort: true,
    }
  };
})
