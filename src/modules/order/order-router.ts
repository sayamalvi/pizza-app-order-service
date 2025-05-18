import express from 'express';
import authenticate from '../../common/middlewares/authenticate';
import { asyncWrapper } from '../../common/utils/async-wrapper';
import { OrderController } from './order-controller';
import { StripeGW } from '../payment/stripe';

const router = express.Router();
const paymentGw = new StripeGW();

const orderController = new OrderController(paymentGw);

router.post('/', authenticate, asyncWrapper(orderController.create));

export default router;
