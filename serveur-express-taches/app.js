const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 3001;

// Middleware pour analyser le JSON dans le corps des requêtes
app.use(express.json());

// Configuration des emails en dur
const emailList = ["exemple1@mail.com", "exemple2@mail.com"];

// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'mailtrap',
    auth: {
        user: '',
        pass: ''
    }
});

// Fonction pour envoyer un email
const envoyerEmail = async (sujet, texte) => {
    const mailOptions = {
        from: '',
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

// Tâches
let taches = [];
let idCounter = 1;

// Routes (CRUD)
app.post('/taches', async (req, res) => {
    const { nom } = req.body;
    if (!nom) return res.status(400).json({ message: "Nom de tâche requis" });

    const tache = { id: idCounter++, nom };
    taches.push(tache);
    
    await envoyerEmail("Tâche créée", `La tâche "${nom}" a été créée.`);
    res.status(201).json(tache);
});

app.get('/taches', async (req, res) => {
    await envoyerEmail("Liste des tâches consultée", "La liste des tâches a été consultée.");
    res.status(200).json(taches);
});

app.get('/taches/:id', async (req, res) => {
    const tache = taches.find(t => t.id === parseInt(req.params.id));
    if (!tache) return res.status(404).json({ message: "Tâche non trouvée" });

    await envoyerEmail("Tâche consultée", `La tâche "${tache.nom}" a été consultée.`);
    res.status(200).json(tache);
});

app.put('/taches/:id', async (req, res) => {
    const { nom } = req.body;
    const tache = taches.find(t => t.id === parseInt(req.params.id));
    if (!tache) return res.status(404).json({ message: "Tâche non trouvée" });

    tache.nom = nom || tache.nom;

    await envoyerEmail("Tâche mise à jour", `La tâche "${tache.nom}" a été mise à jour.`);
    res.status(200).json(tache);
});

app.delete('/taches/:id', async (req, res) => {
    const index = taches.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Tâche non trouvée" });

    const [tacheSupprimee] = taches.splice(index, 1);

    await envoyerEmail("Tâche supprimée", `La tâche "${tacheSupprimee.nom}" a été supprimée.`);
    res.status(200).json({ message: "Tâche supprimée", tache: tacheSupprimee });
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});