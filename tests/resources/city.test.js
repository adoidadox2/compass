import request from 'supertest';

import app from '../../src/App';

describe('City tests', () => {
  describe('GET /cities', () => {
    it('should return an array of cities', async () => {
      const response = await request(app)
        .get('/cities')
        .set('Accept', 'application/json');

      expect(response.statusCode).toEqual(200);
      expect(response.body.data).toEqual(expect.any(Array));
    });

    it('should query cities by state', async () => {
      const response = await request(app)
        .get('/cities?state=São Paulo')
        .set('Accept', 'application/json');

      expect(response.statusCode).toEqual(200);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should query cities by name', async () => {
      const response = await request(app)
        .get('/cities?name=Rio de Janeiro')
        .set('Accept', 'application/json');

      expect(response.statusCode).toEqual(200);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('POST /cities', () => {
    it('should create a city', async () => {
      const response = await request(app)
        .post('/cities')
        .send({
          name: 'Caruaru',
          state: 'Pernambuco',
        })
        .set('Accept', 'application/json');

      expect(response.statusCode).toEqual(200);
      expect(response.body.data.name).toEqual('Caruaru');
      expect(response.body.data.state).toEqual('Pernambuco');
    });

    it('should throw an error when data is empty', async () => {
      const response = await request(app)
        .post('/cities')
        .send({})
        .set('Accept', 'application/json');

      expect(response.statusCode).toEqual(400);
    });

    it('should throw an error when name is not provided', async () => {
      const response = await request(app)
        .post('/cities')
        .send({
          state: 'Pernambuco',
        })
        .set('Accept', 'application/json');

      expect(response.statusCode).toEqual(400);
    });

    it('should throw an error when state is not provided', async () => {
      const response = await request(app)
        .post('/cities')
        .send({
          name: 'Caruaru',
        })
        .set('Accept', 'application/json');

      expect(response.statusCode).toEqual(400);
    });
  });
});
