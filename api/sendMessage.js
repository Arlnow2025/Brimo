export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const { text } = req.body;

    if (!token || !chatId || !text) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    try {
        const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text }),
        });

        if (!response.ok) {
            const error = await response.json();
            return res.status(response.status).json({ error });
        }

        const result = await response.json();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
              }
