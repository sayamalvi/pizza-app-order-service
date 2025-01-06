import express from 'express';
import { CustomerController } from './customer-controller';
import { asyncWrapper } from '../../common/utils/async-wrapper';
import { CustomerService } from './customer-service';
import logger from '../../config/logger';
import authenticate from '../../common/middlewares/authenticate';

const router = express.Router();
const customerService = new CustomerService(logger);
const customerController = new CustomerController(logger, customerService);

router.get('/', authenticate, asyncWrapper(customerController.getCustomer));

export default router;