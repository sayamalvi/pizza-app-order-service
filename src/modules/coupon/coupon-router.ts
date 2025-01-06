import express from 'express';
import authenticate from '../../common/middlewares/authenticate';
import { CouponController } from './coupon-controller';
import { asyncWrapper } from '../../common/utils/async-wrapper';
import { CouponService } from './coupon-service';
import logger from '../../config/logger';

const router = express.Router();
const couponService = new CouponService();
const couponController = new CouponController(logger, couponService);

router.post('/', authenticate, asyncWrapper(couponController.create));
router.post('/verify', authenticate, asyncWrapper(couponController.create));

export default router;
