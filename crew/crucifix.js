/**
 * ✝️ MADARA-V2 : SYSTEM CRUCIFIX (JUDGMENT)
 * Identité : 『мŖ』MÄĐÄŖÄ
 */

const chalk = require('chalk')

module.exports = async (client, m, { from, isGroup, isAdmins, isOwner, args, reply, mentionUser }) => {
    try {
        // Seul Madara (Owner) peut exécuter le Jugement Final
        if (!isOwner) return reply('❌ Seul le possesseur du Rinnegan peut utiliser le Crucifix.')

        // On récupère la personne à juger (soit par mention, soit en répondant à son message)
        let target = m.quoted ? m.quoted.sender : mentionUser[0] ? mentionUser[0] : args[0] ? args[0].replace('@', '') + '@s.whatsapp.net' : null

        if (!target) return reply('⚔️ *SENTENCE INCOMPLÈTE* : Mentionne l\'impur qui doit subir le Crucifix.')

        // Empêcher de s'auto-crucifier
        if (target === client.user.id.split(':')[0] + '@s.whatsapp.net') return reply('❌ Je ne peux pas juger mon propre créateur.')

        const action = args[0] ? args[0].toLowerCase() : ''

        reply(`✝️ *RITUEL DU CRUCIFIX : ACTIVATION*\n\nLe sujet
