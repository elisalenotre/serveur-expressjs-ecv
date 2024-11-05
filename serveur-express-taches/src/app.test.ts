import request from 'supertest';
import { app } from './app';

describe('Tests API pour les tâches', () => {
    it('POST /taches - devrait créer une nouvelle tâche', async () => {
        const response = await request(app)
            .post('/taches')
            .send({ nom: 'Nouvelle Tâche' });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.nom).toBe('Nouvelle Tâche');
    });

    it('GET /taches - devrait renvoyer la liste des tâches', async () => {
        const response = await request(app).get('/taches');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });

    it('GET /taches/:id - devrait renvoyer une tâche par ID', async () => {
        const newTask = await request(app)
            .post('/taches')
            .send({ nom: 'Tâche à consulter' });

        const response = await request(app).get(`/taches/${newTask.body.id}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', newTask.body.id);
        expect(response.body.nom).toBe('Tâche à consulter');
    });

    it('PUT /taches/:id - devrait mettre à jour une tâche par ID', async () => {
        const newTask = await request(app)
            .post('/taches')
            .send({ nom: 'Tâche mise à jour' });

        const response = await request(app)
            .put(`/taches/${newTask.body.id}`)
            .send({ nom: 'Tâche mise à jour' });

        expect(response.status).toBe(200);
        expect(response.body.nom).toBe('Tâche mise à jour');
    });

    it('DELETE /taches/:id - devrait supprimer une tâche par ID', async () => {
        const newTask = await request(app)
            .post('/taches')
            .send({ nom: 'Tâche à supprimer' });

        const response = await request(app).delete(`/taches/${newTask.body.id}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Tâche supprimée');
        expect(response.body.tache.nom).toBe('Tâche à supprimer');
    });
});