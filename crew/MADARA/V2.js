import config from '../config.js';
import fs from 'fs';
import chalk from 'chalk';

export default async (client, m, chatUpdate, store) => {
    try {
        const { type, from } = m;
        const body = (type === 'conversation') ? m.message.conversation : (type === 'extendedTextMessage') ? m.message.extendedTextMessage.text : '';
        
        const prefix = config.PREFIX; 
        const isCmd = body.startsWith(prefix);
        const command = isCmd ? body.slice(prefix.length).trim().split(/\s+/).shift().toLowerCase() : '';

        switch (command) {
            case 'menu': {
                const messageMenu = `
╔════════════════════╗
    *${config.madara_solitaire}*
╚════════════════════╝

👤 *Proprio* : ${config.OWNER_NAME}
⌨️ *Prefixe* : ${prefix}

*--- COMMANDES ---*
🔹 ${prefix}alive : État du bot
🔹 ${prefix}ping : Vitesse
🔹 ${prefix}owner : Contact

> POWERED BY ${config.madara_solitaire.toUpperCase()}
`;

                // Envoi de ta vidéo
                await client.sendMessage(from, { 
                    video: { url: config.VIDEO_URL }, 
                    caption: messageMenu 
                }, { quoted: m });

                // Envoi de ton audio
                await client.sendMessage(from, { 
                    audio: { url: config.AUDIO_URL }, 
                    mimetype: 'audio/mp4', 
                    ptt: true 
                }, { quoted: m });
            }
            break;

            case 'alive':
                await client.sendMessage(from, { text: `*${config.madara-v2}* est prêt à l'action ! ⚡` }, { quoted: m });
            break;
        }

    } catch (err) {
        console.log(chalk.red("Erreur : "), err);
    }
};
