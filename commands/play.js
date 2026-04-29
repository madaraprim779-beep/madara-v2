import stylizedChar from "../utils/fancy.js"
import axios from "axios"

export async function play(message, client) {
    const remoteJid = message.key.remoteJid

    const botName = "madara v2"

    const rawText =
        message.message?.conversation ||
        message.message?.extendedTextMessage?.text ||
        ''

    const text = rawText.trim()

    try {
        const query = text.split(/\s+/).slice(1).join(' ')

        if (!query) {
            return client.sendMessage(remoteJid, {
                text: stylizedChar(`⛧ ${botName} ⛧\n❌ Donne un titre.\nEx: .play madara l'éternel`)
            })
        }

        await client.sendMessage(remoteJid, {
            text: stylizedChar(`⛧ ${botName} ⛧\n🔎 Recherche : ${query}`),
            quoted: message
        })

        // 🔍 API search
        const searchUrl = `https://apis.davidcyriltech.my.id/play?query=${encodeURIComponent(query)}`
        const res = await axios.get(searchUrl, { timeout: 15000 })

        if (!res.data?.status || !res.data?.result) {
            throw new Error("Aucun résultat")
        }

        const data = res.data.result
        const videoUrl = data.url || data.download_url

        if (!videoUrl) throw new Error("URL introuvable")

        // 🎧 API audio
        const audioUrl = `https://youtubeabdlpro.abrahamdw882.workers.dev/?url=${encodeURIComponent(videoUrl)}`

        // 🖼️ INFO SONG
        await client.sendMessage(remoteJid, {
            image: { url: data.thumbnail },
            caption:
                `⛧ MADARA V2 ⛧\n\n` +
                `🎵 ${data.title}\n` +
                `⏱️ ${data.duration || '??'}\n` +
                `👁️ ${data.views || '??'} vues\n\n` +
                `💀 MODE ÉTERNEL ACTIVÉ`,
            quoted: message
        })

        // 🔥 AUDIO ULTRA MODE
        await client.sendMessage(remoteJid, {
            audio: { url: audioUrl },
            mimetype: "audio/mpeg",
            ptt: true, // 🔥 mode vocal automatique
            quoted: message
        })

        console.log(`🔥 MADARA V2 PLAY OK: ${data.title}`)

    } catch (error) {
        console.error("❌ MADARA ERROR:", error.message)

        await client.sendMessage(remoteJid, {
            text: stylizedChar(`⛧ ${botName} ⛧\n❌ Erreur système`)
        })
    }
}

export default play