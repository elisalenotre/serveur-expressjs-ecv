import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer';

const app = express();
const PORT = 3001;

app.use(express.json());

// La liste des emails
const emailList = ["mandy83@ethereal.email"];

// Config Nodemailer avec Ethereal
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'mandy83@ethereal.email',
        pass: 'VBpFrmcsa8ekgjka5r'
    }
});

// Interface pour une tâche
interface Tache {
    id: number;
    nom: string;
}

// Fonction pour envoyer mail
const envoyerEmail = async (sujet: string, texte: string, nomUtilisateur: string) => {
    const mailOptions = {
        from: '"Tâches App" <mandy83@ethereal.email>',
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
}

// Tâches (base de données)
let taches: Tache[] = [];
let idCounter = 1;

// Routes (CRUD)
app.post('/taches', async (req: Request, res: Response) => {
    const { nom }: { nom: string } = req.body;

    const tache: Tache = { id: idCounter++, nom };
    taches.push(tache);

    await envoyerEmail("Tâche créée", `La tâche "${nom}" a bien été créée.`, "Mandy");
    res.status(201).json(tache);
});

app.get('/taches', async (req: Request, res: Response) => {
    await envoyerEmail("Liste des tâches consultée", "La liste des tâches vient d'être consultée.", "Mandy");
    res.status(200).json(taches);
});

app.get('/taches/:id', async (req: Request, res: Response) => {
    const { nom }: { nom: string } = req.body;
    const tache = taches.find(t => t.id === parseInt(req.params.id));

    await envoyerEmail("Tâche consultée", `La tâche "${nom}" vient d'être consultée.`, "Mandy");
    res.status(200).json(tache);
});

app.put('/taches/:id', async (req: Request, res: Response) => {
    const { nom }: { nom: string } = req.body;
    const tache = taches.find(t => t.id === parseInt(req.params.id));

    await envoyerEmail("Tâche mise à jour", `La tâche "${nom}" a bien été mise à jour.`, "Mandy");
    res.status(200).json(tache);
});

app.delete('/taches/:id', async (req: Request, res: Response) => {
    const index = taches.findIndex(t => t.id === parseInt(req.params.id));

    const [tacheSupprimee] = taches.splice(index, 1);

    await envoyerEmail("Tâche supprimée", `La tâche "${tacheSupprimee.nom}" a bien été supprimée.`, "Mandy");
    res.status(200).json({ message: "Tâche supprimée", tache: tacheSupprimee });
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
