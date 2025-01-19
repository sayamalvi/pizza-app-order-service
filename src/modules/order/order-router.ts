import express from 'express';
import authenticate from '../../common/middlewares/authenticate';
import { asyncWrapper } from '../../common/utils/async-wrapper';
import { OrderController } from './order-controller';

const router = express.Router();
const orderController = new OrderController();

router.post('/', authenticate, asyncWrapper(orderController.create));

export default router;
