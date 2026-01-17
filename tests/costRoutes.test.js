const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

/**
 * Test cases for the /api/add endpoint
 */
describe('POST /api/add', () => {
    it('should add a new cost item with a valid category and return it', async () => {
        const response = await request(app).post('/api/add').send({
            userid: '123123',
            description: 'Groceries',
            category: 'food',
            sum: 50,
        });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('userid', 123123);
        expect(response.body).toHaveProperty('description', 'Groceries');
        expect(response.body).toHaveProperty('category', 'food');
        expect(response.body).toHaveProperty('sum', 50);
    });

    it('should return an error for an invalid category', async () => {
        const response = await request(app).post('/api/add').send({
            userid: '123123',
            description: 'Groceries',
            category: 'invalidCategory',
            sum: 50,
        });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'Invalid category. Allowed categories are: food, health, housing, sports, education');
    });

    it('should return an error for missing required fields', async () => {
        const response = await request(app).post('/api/add').send({
            description: 'Groceries',
        });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'One or more required properties are missing');
    });
});

/**
 * After all tests are complete, close the MongoDB connection
 */
afterAll(async () => {
    await mongoose.connection.close();
});
