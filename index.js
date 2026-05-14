import connectToWhatsapp from './MADARA/V2.js';
import config from './config.js';

// Lancement du bot Madara Solitaire
(async () => {
    try {
        console.log(`Démarrage de ${config.BOT_NAME}...`);
        await connectToWhatsapp();
        console.log('Connexion établie avec succès ! ✅');
    } catch (error) {
        console.error('Erreur lors du lancement :', error);
    }
})();
