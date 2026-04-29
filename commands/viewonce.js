import { madara v2 } from '../utils/DigixNew.js'
import { downloadMediaMessage } from 'baileys'
import fs from 'fs'
import path from 'path'
import stylizedChar from '../utils/fancy.js'

export async function viewonce(client, message) {
    const remoteJid = message.key.remoteJid

    // 🔥 IDENTITÉ
    const botName = "madara v2"

    const quotedMessage = message.message?.extendedTextMessage?.contextInfo?.quotedMessage

    if (!quotedMessage?.imageMessage?.viewOnce &&
        !quotedMessage?.videoMessage?.viewOnce &&
        !quotedMessage?.audioMessage?.viewOnce) {

        return client.sendMessage(remoteJid, {
            text: stylizedChar(`⛧ ${botName} ⛧\nRéponds à un message ViewOnce valide.`)
        })
    }

    const content = DigixNew(quotedMessage)

    // 🔥 Supprime le mode viewOnce
    function modifyViewOnce(obj) {
        if (typeof obj !== 'object' || obj === null) return
        for (const key in obj) {
            if (key === 'viewOnce') obj[key] = false
            else if (typeof obj[key] === 'object') modifyViewOnce(obj[key])
        }
    }

    modifyViewOnce(content)

    try {
        const mediaBuffer = await downloadMediaMessage(
            { message: content },
            'buffer',
            {}
        )

        if (!mediaBuffer) {
            return client.sendMessage(remoteJid, {
                text: stylizedChar(`⚠️ ${botName} : Échec du téléchargement`)
            })
        }

        let filePath = ''
        let sendType = {}

        // 📸 IMAGE
        if (content?.imageMessage) {
            filePath = path.resolve('./temp_madara_v2.jpg')
            fs.writeFileSync(filePath, mediaBuffer)

            sendType = {
                image: { url: filePath },
                caption: `⛧ MADARA V2 ⛧\n👁️ VIEW ONCE DÉTRUIT`
            }

        // 🎥 VIDEO
        } else if (content?.videoMessage) {
            filePath = path.resolve('./temp_madara_v2.mp4')
            fs.writeFileSync(filePath, mediaBuffer)

            sendType = {
                video: { url: filePath },
                caption: `⛧ MADARA V2 ⛧\n🎬 DOMINATION ABSOLUE`
            }

        // 🎵 AUDIO
        } else if (content?.audioMessage) {
            filePath = path.resolve('./temp_madara_v2.mp3')
            fs.writeFileSync(filePath, mediaBuffer)

            sendType = {
                audio: { url: filePath },
                mimetype: "audio/mpeg",
                ptt: true
            }
        }

        // 🔥 Envoi du média
        await client.sendMessage(remoteJid, sendType)

        // 🎵 SON MADARA (optionnel)
        await client.sendMessage(remoteJid, {
            audio: { url: "https://files.catbox.moe/xxxxxx.mp3" }, // remplace
            mimetype: "audio/mpeg",
            ptt: true
        })

        // 🧹 Suppression fichier temporaire
        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
        }

    } catch (error) {
        console.error('Error:', error)

        await client.sendMessage(remoteJid, {
            text: stylizedChar(`❌ ${botName} : erreur lors du traitement`)
        })
    }
}

export default viewonce