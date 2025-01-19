import config from 'config';
import express, { Request, Response } from 'express';
import { globalErrorHandler } from './common/middlewares/globalErrorHandler';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import customerRouter from './modules/customer/customer-router';
import couponRouter from './modules/coupon/coupon-router';
import orderRouter from './modules/order/order-router';

const app = express();
const ALLOWED_DOMAINS = [
    config.get('frontend.clientUI'),
    config.get('frontend.adminUI'),
];

app.use(cors({ origin: ALLOWED_DOMAINS as string[], credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send({ message: config.get('server.port') });
});

app.use('/customer', customerRouter);
app.use('/coupons', couponRouter);
app.use('/orders', orderRouter);

app.use(globalErrorHandler);

export default app;
