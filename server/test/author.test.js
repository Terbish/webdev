import request from 'supertest';
import { expect } from 'chai';
import app from '../server.js'; 

describe('Author Routes', () => {
    let authors = [];

    it('should create a new author', async () => {
        const newAuthor = {
            fullName: 'John Doe',
            bio: 'An acclaimed novelist.',
            birthDate: '1980-01-01',
            primaryGenre: 'fiction', 
            id: 1,
        };
        const response = await request(app)
            .post('/authors')
            .send(newAuthor)
            .expect(201);
        expect(response.body).to.eql(newAuthor);
        authors.push(newAuthor);
    });
    it ('should list all authors', async () => {
        const response = await request(app)
            .get('/authors')
            .expect(200);
        expect(response.body).to.eql(authors);
    });
    it ('should update an author\'s bio', async () => {
        const author = authors[0];
        const updatedBio = 'A new bio.';
        const response = await request(app)
            .put(`/authors/${author.id}/bio`)
            .send({ bio: updatedBio })
            .expect(200);
        expect(response.body.bio).to.eql(updatedBio);
        author.bio = updatedBio;
    });
    it ('should get an author by name', async () => {
        const author = authors[0];
        const response = await request(app)
            .get(`/authors/${author.fullName}`)
            .expect(200);
        expect(response.body).to.eql(author);
    });
});
