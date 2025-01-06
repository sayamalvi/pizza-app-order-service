import { Response } from 'express';
import { AuthRequest } from '../../common/types';
import { CustomerService } from './customer-service';
import { Logger } from 'winston';

export class CustomerController {
    constructor(
        private readonly logger: Logger,
        private readonly customerService: CustomerService,
    ) {}

    getCustomer = async (
        req: AuthRequest,
        res: Response,
    ) => {
        const { sub: userId, firstName, lastName, email } = req.auth;

        const customer = await this.customerService.getCustomer({
            userId,
            firstName,
            lastName,
            email,
        });
        this.logger.info('Fetched Customer', { customer });
        res.status(200).json({ customer });
    };
}
