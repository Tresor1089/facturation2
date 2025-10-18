const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const schedule = require('node-schedule');

const client = new Client();

// Génération du QR code pour connecter WhatsApp
client.on('qr', (qr) => {
    console.log('QR Code reçu, scanne avec ton téléphone :');
    qrcode.generate(qr, { small: true });
});

// Quand le client est prêt
client.on('ready', () => {
    console.log('Le client WhatsApp est prêt.');

    // Planification des messages automatiques tous les jours à 8h
    schedule.scheduleJob('0 8 * * *', () => {
        const numbers = ['243811234567@c.us', '243812345678@c.us']; // Numéros des destinataires
        const message = "Bonjour ! Voici votre notification quotidienne.";

        numbers.forEach((number) => {
            client.sendMessage(number, message)
                .then(() => {
                    console.log(`Message envoyé à ${number}`);
                })
                .catch((err) => {
                    console.error(`Erreur lors de l'envoi à ${number}: ${err}`);
                });
        });
    });
});

// Gestion des erreurs
client.on('auth_failure', (msg) => {
    console.error('Erreur d\'authentification :', msg);
});

client.on('disconnected', (reason) => {
    console.log('Déconnecté :', reason);
});

client.initialize();
