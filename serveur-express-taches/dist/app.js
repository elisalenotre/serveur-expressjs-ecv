"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const app = (0, express_1.default)();
const PORT = 3001;
app.use(express_1.default.json());
// La liste des emails
const emailList = ["mandy83@ethereal.email"];
// Config Nodemailer avec Ethereal
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'mandy83@ethereal.email',
        pass: 'VBpFrmcsa8ekgjka5r'
    }
});
// Fonction pour envoyer mail
const envoyerEmail = (sujet, texte, nomUtilisateur) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: '"Tâches App" <mandy83@ethereal.email>',
        to: emailList,
        subject: sujet,
        text: `Bonjour ${nomUtilisateur},\n\n${texte}\n\nBonne journée !`,
        html: `<p>Bonjour ${nomUtilisateur},</p><p>${texte}</p><p>Bonne journée !</p>`
    };
    try {
        yield transporter.sendMail(mailOptions);
        console.log("Email envoyé avec succès !");
    }
    catch (error) {
        console.error("Erreur lors de l'envoi de l'email :", error);
    }
});
// Tâches (base de données)
let taches = [];
let idCounter = 1;
// Routes (CRUD)
app.post('/taches', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nom } = req.body;
    if (!nom)
        return res.status(400).json({ message: "Nom de tâche requis" });
    const tache = { id: idCounter++, nom };
    taches.push(tache);
    yield envoyerEmail("Tâche créée", `La tâche "${nom}" a bien été créée.`, "Mandy");
    res.status(201).json(tache);
}));
app.get('/taches', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield envoyerEmail("Liste des tâches consultée", "La liste des tâches vient d'être consultée.", "Mandy");
    res.status(200).json(taches);
}));
app.get('/taches/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tache = taches.find(t => t.id === parseInt(req.params.id));
    if (!tache)
        return res.status(404).json({ message: "Tâche non trouvée" });
    yield envoyerEmail("Tâche consultée", `La tâche "${tache.nom}" vient d'être consultée.`, "Mandy");
    res.status(200).json(tache);
}));
app.put('/taches/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nom } = req.body;
    const tache = taches.find(t => t.id === parseInt(req.params.id));
    if (!tache)
        return res.status(404).json({ message: "Tâche non trouvée" });
    tache.nom = nom || tache.nom;
    yield envoyerEmail("Tâche mise à jour", `La tâche "${tache.nom}" a bien été mise à jour.`, "Mandy");
    res.status(200).json(tache);
}));
app.delete('/taches/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const index = taches.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1)
        return res.status(404).json({ message: "Tâche non trouvée" });
    const [tacheSupprimee] = taches.splice(index, 1);
    yield envoyerEmail("Tâche supprimée", `La tâche "${tacheSupprimee.nom}" a bien été supprimée.`, "Mandy");
    res.status(200).json({ message: "Tâche supprimée", tache: tacheSupprimee });
}));
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
