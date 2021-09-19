const dbHandler = require('./db-handler');
const request = require('supertest');
const app = require('../app');
const CustomerService = require('../services/Customer');
const ReviewService = require('../services/Review');

describe('Review API tests', () => {

    beforeAll(async () => await dbHandler.connect());
    afterEach(async () => await dbHandler.clearDatabase());
    afterAll(async () => await dbHandler.closeDatabase());

    test('It should return empty list of reviews', (done) => {
        request(app)
            .get('/api/v1/reviews/P001')
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('data');
                expect(response.body).toHaveProperty('status');
                expect(response.body.status).toBe('ok');
                expect(response.body.data).toHaveProperty('reviews');
                expect(response.body.data).toHaveProperty('pagination');
                expect(response.body.data.reviews).toHaveLength(0);
                done();
            });
    });

    test('It should add a new review', (done) => {
        request(app)
            .post('/api/v1/reviews/P001')
            .send('title=test&summary=test&rating=4&isRecommend=true&email=test@test.com&nickname=test')
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('status');
                expect(response.body.status).toBe('ok');
                expect(response.body).toHaveProperty('id');
                done();
            });
    });

    test('It should return list of reviews with one review', (done) => {
        CustomerService.createCustomer({
            email: 'test@test.com',
        }).then(() => {
            ReviewService.createReview({
                productId: 'P001',
                rating: 4,
                title: 'test',
                summary: 'test',
                isRecommend: false,
                email: 'test@test.com',
                nickname: 'test'
            }).then(() => {
                request(app)
                    .get('/api/v1/reviews/P001')
                    .then(response => {
                        expect(response.statusCode).toBe(200);
                        expect(response.body).toHaveProperty('data');
                        expect(response.body).toHaveProperty('status');
                        expect(response.body.status).toBe('ok');
                        expect(response.body.data).toHaveProperty('reviews');
                        expect(response.body.data.reviews).toHaveLength(1);
                        done();
                    });
            })
        });
    });

    test('It should not add a new review if the customer is blocked', (done) => {
        const params = {
            email: 'test@test.com',
        };

        CustomerService.createCustomer(params)
            .then(() => {
                CustomerService.blockCustomer(params)
                    .then(() => {
                        request(app)
                            .post('/api/v1/reviews/P001')
                            .send('title=test&summary=test&rating=4&isRecommend=true&email=test@test.com&nickname=test')
                            .then(response => {
                                expect(response.statusCode).toBe(200);
                                expect(response.body).toHaveProperty('status');
                                expect(response.body.status).toBe('error');
                                done();
                            });
                    });
            });
    });

    test('It should not add a new review if missing required fields', (done) => {
        request(app)
            .post('/api/v1/reviews/P001')
            .send('isRecommend=true')
            .then(response => {
                expect(response.statusCode).toBe(500);
                expect(response.body).toHaveProperty('status');
                expect(response.body.status).toBe('error');
                done();
            });
    });
});
