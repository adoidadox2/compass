import request from 'supertest';

import server from '../../src/App';

import { City, Customer } from '../../src/models';

describe('Customer tests', () => {
  let recifeCity;

  beforeAll(async () => {
    recifeCity = await City.create({
      name: 'Recife',
      state: 'Pernambuco',
    });
  });

  describe('GET /customers', () => {
    it('should return an array of customers', async () => {
      const response = await request(server)
        .get('/customers')
        .set('Accept', 'application/json');

      expect(response.statusCode).toEqual(200);
      expect(response.body.data).toEqual(expect.any(Array));
    });

    it('should query customers by name', async () => {
      const response = await request(server)
        .get('/customers?name=Augusto')
        .set('Accept', 'application/json');

      expect(response.statusCode).toEqual(200);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('GET /customers/:customerId', () => {
    it('should throw an error when customer is not found', async () => {
      const response = await request(server)
        .get('/customers/608548003ce9e94398193c66')
        .set('Accept', 'application/json');

      expect(response.statusCode).toEqual(404);
    });

    it('should return a customer by its id', async () => {
      const createdCustomer = await Customer.create({
        full_name: 'Augusto',
        gender: 'male',
        birth_date: '1991-03-11',
        city: recifeCity,
      });

      const response = await request(server)
        .get(`/customers/${createdCustomer._id}`)
        .set('Accept', 'application/json');

      expect(response.statusCode).toEqual(200);
      expect(response.body.data).toMatchObject({
        _id: createdCustomer.id,
        full_name: createdCustomer.full_name,
        gender: createdCustomer.gender,
      });
    });
  });

  describe('POST /customers', () => {
    it('should throw an error when data is empty', async () => {
      const response = await request(server)
        .post('/customers')
        .send({})
        .set('Accept', 'application/json');

      expect(response.statusCode).toEqual(400);
    });

    it('should throw an error when full_name is invalid', async () => {
      const response = await request(server)
        .post('/customers')
        .send({
          full_name: null,
        })
        .set('Accept', 'application/json');

      expect(response.statusCode).toEqual(400);
    });

    it('should throw an error when gender is invalid', async () => {
      const response = await request(server)
        .post('/customers')
        .send({
          full_name: 'Augusto',
          gender: 'developer',
        })
        .set('Accept', 'application/json');

      expect(response.statusCode).toEqual(400);
    });

    it('should throw an error when birth_date is invalid', async () => {
      const response = await request(server)
        .post('/customers')
        .send({
          full_name: 'Augusto',
          gender: 'male',
          birth_date: null,
        })
        .set('Accept', 'application/json');

      expect(response.statusCode).toEqual(400);
    });

    it('should create a customer', async () => {
      const response = await request(server)
        .post('/customers')
        .send({
          full_name: 'Augusto',
          gender: 'male',
          birth_date: '1991-08-11',
          city_id: recifeCity._id,
        })
        .set('Accept', 'application/json');

      expect(response.statusCode).toEqual(200);
      expect(response.body.data).toMatchObject({
        full_name: 'Augusto',
        gender: 'male',
        birth_date: '1991-08-11T00:00:00.000Z',
      });
    });
  });

  describe('PATCH /customers/:customerId', () => {
    it('should throw an error when customer is not found', async () => {
      const response = await request(server)
        .patch('/customers/608548003ce9e94398193c66')
        .send({
          full_name: 'Kelly',
        })
        .set('Accept', 'application/json');

      expect(response.statusCode).toEqual(404);
    });

    it('should throw an error when full_name is invalid', async () => {
      const createdCustomer = await Customer.create({
        full_name: 'Augusto',
        gender: 'male',
        birth_date: '1991-03-11',
        city: recifeCity,
      });

      const response = await request(server)
        .patch(`/customers/${createdCustomer._id}`)
        .send({
          full_name: null,
        })
        .set('Accept', 'application/json');

      expect(response.statusCode).toEqual(400);
    });

    it('should update a full_name of customer', async () => {
      const createdCustomer = await Customer.create({
        full_name: 'Augusto',
        gender: 'male',
        birth_date: '1991-03-11',
        city: recifeCity,
      });

      const response = await request(server)
        .patch(`/customers/${createdCustomer._id}`)
        .send({ full_name: 'Cleber' })
        .set('Accept', 'application/json');

      expect(response.statusCode).toEqual(200);
      expect(response.body.data.full_name).toEqual('Cleber');
    });
  });

  describe('DELETE /customers/:customerId', () => {
    it('should throw an error when customer is not found', async () => {
      const response = await request(server)
        .delete('/customers/608548003ce9e94398193c66')
        .set('Accept', 'application/json');

      expect(response.statusCode).toEqual(404);
    });

    it('should delete a customer', async () => {
      const createdCustomer = await Customer.create({
        full_name: 'Augusto',
        gender: 'male',
        birth_date: '1991-03-11',
        city: recifeCity,
      });

      const response = await request(server)
        .delete(`/customers/${createdCustomer._id}`)
        .set('Accept', 'application/json');

      expect(response.statusCode).toEqual(200);
    });
  });
});
