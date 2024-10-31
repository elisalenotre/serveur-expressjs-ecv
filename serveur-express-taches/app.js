const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 3001;

app.use(express.json());

// La liste des emails
const emailList = ["zackery.fay69@ethereal.email"];

// Config Nodemailer avec Ethereal
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'zackery.fay69@ethereal.email',
        pass: 'SZThSsvxDJn5fazZcX'
    }
});

// Fonction pour envoyer mail
const envoyerEmail = async (sujet, texte, nomUtilisateur) => {
    const mailOptions = {
        from: '"Tâches App" <zackery.fay69@ethereal.email>',
        to: emailList,
        subject: sujet,
        text: `Bonjour ${nomUtilisateur},\n\n${texte}\n\nBonne journée !`,
        html: `<p>Bonjour ${nomUtilisateur},</p><p>${texte}</p><p>Bonne journée !</p>`
    };
        try {
        await transporter.sendMail(mailOptions);
        console.log("Email envoyé avec succès !");
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email :", error);
    }
};

// Tâches (base de données)
let taches = [];
let idCounter = 1;

// Routes (CRUD)
app.post('/taches', async (req, res) => {
    const { nom } = req.body;
    if (!nom) return res.status(400).json({ message: "Nom de tâche requis" });

    const tache = { id: idCounter++, nom };
    taches.push(tache);

    await envoyerEmail("Tâche créée", `La tâche "${nom}" a bien été créée.`, "Zackery Fay");
    res.status(201).json(tache);
});

app.get('/taches', async (req, res) => {
    await envoyerEmail("Liste des tâches consultée", "La liste des tâches vient d'être consultée.", "Zackery Fay");
    res.status(200).json(taches);
});

app.get('/taches/:id', async (req, res) => {
    const tache = taches.find(t => t.id === parseInt(req.params.id));
    if (!tache) return res.status(404).json({ message: "Tâche non trouvée" });

    await envoyerEmail("Tâche consultée", `La tâche "${tache.nom}" vient d'être consultée.`, "Zackery Fay");
    res.status(200).json(tache);
});

app.put('/taches/:id', async (req, res) => {
    const { nom } = req.body;
    const tache = taches.find(t => t.id === parseInt(req.params.id));
    if (!tache) return res.status(404).json({ message: "Tâche non trouvée" });

    tache.nom = nom || tache.nom;

    await envoyerEmail("Tâche mise à jour", `La tâche "${tache.nom}" a bien été mise à jour.`, "Zackery Fay");
    res.status(200).json(tache);
});

app.delete('/taches/:id', async (req, res) => {
    const index = taches.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Tâche non trouvée" });

    const [tacheSupprimee] = taches.splice(index, 1);

    await envoyerEmail("Tâche supprimée", `La tâche "${tacheSupprimee.nom}" a bien été supprimée.`, "Zackery Fay");
    res.status(200).json({ message: "Tâche supprimée", tache: tacheSupprimee });
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});