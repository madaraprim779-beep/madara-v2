import axios from 'axios'

async function url(client, message) {
    const jid = message.key.remoteJid

    // 🔥 Image Madara (URL exemple, tu peux changer)
    const imageUrl = 'https://i.imgur.com/9QZ6F9M.jpg'

    // 🔥 Son Madara (mets ton lien mp3 ici)
    const audioUrl = 'https://files.catbox.moe/xxxxxx.mp3'

    // 🖼️ Envoi image
    await client.sendMessage(jid, {
        image: { url: imageUrl },
        caption: '🔥 MADARA SOLITAIRE 🔥'
    })

    // 🎵 Envoi audio
    await client.sendMessage(jid, {
        audio: { url: audioUrl },
        mimetype: 'audio/mpeg',
        ptt: false // true = vocal WhatsApp
    })
}

export default url