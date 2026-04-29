export async function respond(client, message) {
    const remoteJid = message.key.remoteJid
    const messageBody = message.message?.extendedTextMessage?.text || message.message?.conversation || ''

    // 🔥 TON IDENTITÉ
    const botNumber = "2250709300922@s.whatsapp.net"
    const botTag = "2250709300922"
    const botName = "madara v2"

    // 🔥 Si quelqu’un mentionne ton bot
    if (!message.key.fromMe && messageBody.includes(`@${botTag}`)) {

        // 🖼️ Image + 🎵 Son
        await client.sendMessage(remoteJid, {
            image: { url: 'https://i.imgur.com/9QZ6F9M.jpg' },
            caption: `⛧ ${botName.toUpperCase()} ⛧\n⚠️ ACTIVATION ⚠️`
        })

        await client.sendMessage(remoteJid, {
            audio: { url: "https://files.catbox.moe/xxxxxx.mp3" },
            mimetype: "audio/mpeg",
            ptt: true
        })
    }
}