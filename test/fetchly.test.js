import { expect } from 'chai';
import Fetchly from '../fetchly.js';

describe('Fetchly Test', () => {

    let fetchly;

    before(() => {
        fetchly = new Fetchly({
            baseURL: 'https://jsonplaceholder.typicode.com',
            enableLogging: false,
            requestInterceptor: (config) => {
                config.headers.Authorization = `Bearer token`;
                return config;
            },
            responseInterceptor: (response) => {
                return response;
            },
        });
    });

    it('should return success response for a valid GET request', async () => {
        const response = await fetchly.get('/posts/1');

        expect(response.success).to.be.true;
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('id', 1);
    });

    it('should return an error object for an invalid request', async () => {
        const response = await fetchly.get('/invalid-url');

        expect(response.success).to.be.false;
        expect(response.status).to.equal(404);
        expect(response).to.have.property('message');
    });

    it('should return success response for a valid POST request', async () => {

        const postData = {
            key: 'value',
        };

        const headers = {
            Cookie: 'sessionId=abc123; userId=1',
        };

        const response = await fetchly.post('/posts', postData, { headers });

        expect(response.success).to.be.true;
        expect(response.status).to.equal(201);
        expect(response.data).to.have.property('id');
    });
});
