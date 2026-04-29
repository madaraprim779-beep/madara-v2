/**
 * 🌀 MADARA-V2 : SYSTEM CORE (Lithe.js)
 * Développé pour : 『мŖ』MÄĐÄŖÄ
 */

const { 
    BufferJSON, 
    WA_DEFAULT_EPHEMERAL, 
    generateWAMessageFromContent, 
    proto, 
    generateWAMessageContent, 
    generateWAMessage, 
    prepareWAMessageMedia, 
    areJidsSameUser, 
    getContentType 
} = require('@whiskeysockets/baileys')

const fs = require('fs')
const util = require('util')
const chalk = require('chalk')

module.exports = Lithe = async (client, m, chatUpdate, store) => {
    try {
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
        var budy = (typeof m.text == 'string' ? m.text : '')
        var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "."
        const isCmd = body.startsWith(prefix)
        const command = isCmd ? body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase() : ""
        const args = body.trim().split(/ +/).slice(1)
        const text = q = args.join(" ")
        const from = m.key.remoteJid
        const sender = m.key.fromMe ? (client.user.id.split(':')[0]+'@s.whatsapp.net' || client.user.id) : (m.key.participant || m.key.remoteJid)
        const pushname = m.pushName || "No Name"

        // --- COMMANDES MADARA-V2 ---

        switch (command) {

            case 'crew':
            case 'madara': {
                let crewMsg = `🌑 *MADARA-V2 : L'AVÈNEMENT* 🌑\n\n` +
                              `*"Dans ce monde, là où il y a de la lumière, il y a aussi des ombres."*\n\n` +
                              `👤 *Identité :* 『мŖ』MÄĐÄŖÄ-V2 🩸\n` +
                              `📜 *Statut :* Légende Ressuscitée\n` +
                              `🌀 *Pouvoir :* Tsukuyomi Infini Actif\n\n` +
                              `--- ⚔️ --- \n\n` +
                              `🛡️ *Système :* Bot Élite Opérationnel\n` +
                              `📡 *Réseau :* Déploiement Cloud Actif\n` +
                              `⚔️ *Mission :* Ordre et Domination\n\n` +
                              `*« Le monde sera plongé dans mon rêve éternel. »*`

                await client.sendMessage(from, { 
                    image: { url: './assets/madara.jpg' }, 
                    caption: crewMsg 
                }, { quoted: m })
            }
            break

            case 's':
            case 'sticker': {
                if (/image|video|webp/.test(m.mtype)) {
                    let media = await client.downloadAndSaveMediaMessage(m)
                    await client.sendMessage(from, { sticker: { url: media } }, { quoted: m })
                    fs.unlinkSync(media)
                } else {
                    m.reply(`Envoie une image ou vidéo avec ${prefix}sticker`)
                }
            }
            break

            case 'son':
            case 'audio': {
                if (fs.existsSync('./assets/madara_theme.mp3')) {
                    await client.sendMessage(from, { 
                        audio: { url: './assets/madara_theme.mp3' }, 
                        mimetype: 'audio/mp4', 
                        ptt: true 
                    }, { quoted: m })
                } else {
                    m.reply("❌ Fichier 'madara_theme.mp3' introuvable dans le dossier assets.")
                }
            }
            break

            case 'ping':
                m.reply('Pong! Madara-V2 est en ligne. ⚡')
            break

            default:
                if (isCmd && command) {
                    console.log(chalk.redBright(`[ERREUR] Commande inconnue de ${pushname} : ${command}`))
                }
        }

    } catch (err) {
        console.
