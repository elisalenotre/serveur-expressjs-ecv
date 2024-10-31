const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 3000;

// Middleware pour analyser le JSON dans le corps des requêtes
app.use(express.json());

// Configuration des emails en dur
const emailList = ["exemple1@mail.com", "exemple2@mail.com"];

// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'elisalenotre6@gmail.com',
        pass: 'bibulle946'
    }
});

// Fonction pour envoyer un email
const envoyerEmail = async (sujet, texte) => {
    const mailOptions = {
        from: 'elisalenotre6@gmail.com',
        to: emailList,
        subject: sujet,
        text: texte
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email envoyé avec succès !");
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email :", error);
    }
};
