/**
 * 🛠️ MADARA-V2 : CURIX UTILS
 * Identité : 『мŖ』MÄĐÄŖÄ
 */

const fs = require('fs')
const moment = require('moment-timezone')

// Fonction pour obtenir l'heure selon ton fuseau horaire
const getTime = () => {
    return moment.tz('Africa/Abidjan').format('HH:mm:ss')
}

const getDate = () => {
    return moment.tz('Africa/Abidjan').format('DD/MM/YYYY')
}

// Fonction pour styliser le texte (effet Madara)
const styleText = (text) => {
    return `💠 *[MADARA-V2]* 💠\n\n${text}\n\n⌚ _Heure : ${getTime()}_`
}

// Fonction pour vérifier si un fichier existe dans assets
const checkAsset = (fileName) => {
    return fs.existsSync(`./assets/${fileName}`)
}

module.exports = {
    getTime,
    getDate,
    styleText,
    checkAsset,
    runtime: function(seconds) {
        seconds = Number(seconds);
        var d = Math.floor(seconds / (3600 * 24));
        var h = Math.floor(seconds % (3600 * 24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 60);
        var dDisplay = d > 0 ? d + (d == 1 ? " jour, " : " jours, ") : "";
        var hDisplay = h > 0 ? h + (h == 1 ? " heure, " : " heures, ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " seconde" : " secondes") : "";
        return dDisplay + hDisplay + mDisplay + sDisplay;
    }
}
