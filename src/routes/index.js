import { Router } from 'express';
import cityRouter from './cities.routes';

const routes = Router();

routes.get('/', (request, response) =>
  response.json({
    Author: 'Augusto Vinicius',
    Github: 'https://github.com/adoidadox2',
    Project: 'compass',
    Version: '1.0.0',
    Status: 'Online',
  }),
);

routes.use('/cities', cityRouter);

export default routes;
