/**
 * 🛡️ MADARA-V2 : BLANKX7 SHIELD
 * Identité : 『мŖ』MÄĐÄŖÄ
 */

const chalk = require('chalk')

module.exports = async (client, m, { from, isGroup, isAdmins, isOwner, reply }) => {
    try {
        // Détection automatique des caractères invisibles ou messages suspects (binaires)
        const isBlank = m.body.length > 5000 || /[\u200B-\u200D\uFEFF]/g.test(m.body)

        if (isBlank) {
            // Si c'est un groupe et que l'envoyeur n'est ni admin ni Madara
            if (isGroup && !isAdmins && !isOwner) {
                console.log(chalk.redBright(`[BLANKX7] Attaque détectée de @${m.sender.split('@')[0]}`))
                
                // Suppression du message suspect
                await client.sendMessage(from, { delete: m.key })
                
                // Expulsion immédiate pour protéger le système
                await client.groupParticipantsUpdate(from, [m.sender], 'remove')
                
                return reply(`🚫 *SYSTEM PROTECTION (BLANKX7)* 🚫\n\nTentative de crash détectée. L'utilisateur a été éliminé par le système Madara-V2.`)
            }
        }
    } catch (err) {
        console.log(chalk.redBright(`[ERREUR BLANKX7] : ${err}`))
    }
}
