import config from 'config';
import express, { Request, Response } from 'express';
import { globalErrorHandler } from './common/middlewares/globalErrorHandler';
import customerRouter from './modules/customer/customer-router';
import cors from 'cors';
import cookieParser from 'cookie-parser';

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

app.use(globalErrorHandler);

export default app;
