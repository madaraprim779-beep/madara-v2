/**
 * ❄️ MADARA-V2 : SYSTEM FREEZE
 * Identité : 『мŖ』MÄĐÄŖÄ
 */

const fs = require('fs')
const chalk = require('chalk')

module.exports = async (client, m, { from, isGroup, isAdmins, isOwner, args, reply }) => {
    try {
        // Seul le propriétaire (Madara) ou les admins peuvent geler le groupe
        if (!isGroup) return reply('❌ Cette commande est réservée aux groupes.')
        if (!isAdmins && !isOwner) return reply('❌ Seul un admin ou Madara peut utiliser le sceau de glace.')

        const action = args[0] ? args[0].toLowerCase() : ''

        if (action === 'on') {
            // Ferme le groupe (seuls les admins parlent)
            await client.groupSettingUpdate(from, 'announcement')
            reply(`❄️ *HYOUTON : PRISON DE GLACE*\n\nLe groupe est désormais gelé. Seuls les admins peuvent briser le silence.`)
        } 
        
        else if (action === 'off') {
            // Ouvre le groupe
            await client.groupSettingUpdate(from, 'not_announcement')
            reply(`🔥 *AMATERASU : GLACE BRISÉE*\n\nLe sceau est levé. Tout le monde peut à nouveau s'exprimer.`)
        } 
        
        else {
            // Aide si l'utilisateur ne met pas 'on' ou 'off'
            reply(`⚔️ *UTILISATION DU SCEAU :*\n\nUtilise *.freeze on* pour geler le groupe.\nUtilise *.freeze off* pour le dégeler.`)
        }

    } catch (err) {
        console.log(chalk.redBright(`[ERREUR FREEZE] : ${err}`))
        reply('❌ Une erreur est survenue lors de l\'invocation du sceau.')
    }
}
