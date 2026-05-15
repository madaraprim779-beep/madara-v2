const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeInMemoryStore
} = require("@whiskeysockets/baileys");
const { Boom } = require("@hapi/boom");
const pino = require("pino");
const fs = require("fs");
const config = require("./config");

// Configuration du stockage des messages
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });

async function startMadara() {
    console.log("🚀 Initialisation du Bot Madara-V2...");

    const { state, saveCreds } = await useMultiFileAuthState("./session");
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        logger: pino({ level: "silent" }),
        printQRInTerminal: true,
        auth: state,
        browser: ["Madara-V2", "Safari", "3.0"]
    });

    store.bind(sock.ev);

    // Gestion de la connexion
    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === "close") {
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            if (reason === DisconnectReason.loggedOut) {
                console.log("❌ Déconnecté : Session supprimée. Relance le bot pour scanner le QR.");
            } else {
                console.log("🔄 Reconnexion en cours...");
                startMadara();
            }
        } else if (connection === "open") {
            console.log("✅ Bot connecté avec succès sur Railway !");
        }
    });

    // Sauvegarde des identifiants
    sock.ev.on("creds.update", saveCreds);

    // Gestion des messages
    sock.ev.on("messages.upsert", async ({ messages, type }) => {
        if (type !== "notify") return;
        const msg = messages[0];
        if (!msg.message) return;

        const body = msg.message.conversation || msg.message.extendedTextMessage?.text || "";
        const from = msg.key.remoteJid;

        // Commande de test
        if (body.startsWith(config.prefix || "!")) {
            const command = body.slice(1).trim().toLowerCase();
            if (command === "ping") {
                await sock.sendMessage(from, { text: "Madara-V2 est en ligne ! ⚡" });
            }
        }
    });
}

// Serveur minimaliste pour éviter que Railway ne coupe le déploiement
const http = require("http");
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
    res.write("Madara-V2 est actif sur le port " + PORT);
    res.end();
}).listen(PORT);

startMadara();

