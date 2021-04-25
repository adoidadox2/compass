import { Router } from 'express';

import { CityController } from '../controllers';
import { cityMiddleware, expressValidatorMiddleware } from '../middlewares';

const cityRouter = Router();

cityRouter.get(
  '/',
  cityMiddleware.indexRules,
  expressValidatorMiddleware.result,
  CityController.index,
);

cityRouter.post(
  '/',
  cityMiddleware.storeRules,
  expressValidatorMiddleware.result,
  CityController.store,
);

export default cityRouter;
