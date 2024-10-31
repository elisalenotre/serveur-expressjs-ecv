const request = require('supertest');
const app = require('./app');

describe("Tests pour les routes des tâches", () => {
    it("Crée une tâche", async () => {
        const res = await request(app).post('/taches').send({ nom: "Nouvelle Tâche" });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("nom", "Nouvelle Tâche");
    });

    it("Obtient la liste des tâches", async () => {
        const res = await request(app).get('/taches');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
    
});
