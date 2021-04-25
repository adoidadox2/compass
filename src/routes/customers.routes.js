import { Router } from 'express';

import { CustomerController } from '../controllers';
import { customerMiddleware, expressValidatorMiddleware } from '../middlewares';

const customerRouter = Router();

customerRouter.get(
  '/',
  customerMiddleware.indexRules,
  expressValidatorMiddleware.result,
  CustomerController.index,
);
customerRouter.get(
  '/:customer_id',
  customerMiddleware.showRules,
  expressValidatorMiddleware.result,
  CustomerController.show,
);
customerRouter.patch(
  '/:customer_id',
  customerMiddleware.updateRules,
  expressValidatorMiddleware.result,
  CustomerController.update,
);
customerRouter.delete(
  '/:customer_id',
  customerMiddleware.deleteRules,
  expressValidatorMiddleware.result,
  CustomerController.delete,
);

customerRouter.post(
  '/',
  customerMiddleware.storeRules,
  expressValidatorMiddleware.result,
  CustomerController.store,
);

export default customerRouter;
