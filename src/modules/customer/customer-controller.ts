import { Response } from 'express';
import { AuthRequest } from '../../common/types';
import { CustomerService } from './customer-service';
import { Logger } from 'winston';
import { AddAddressRequest } from './customer-types';

export class CustomerController {
    constructor(
        private readonly logger: Logger,
        private readonly customerService: CustomerService,
    ) {}

    getCustomer = async (req: AuthRequest, res: Response) => {
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

    addAddress = async (req: AddAddressRequest, res: Response) => {
        const { id } = req.params;
        const { address } = req.body;
        const { sub: userId } = req.auth;
        const updatedCustomer = await this.customerService.addAddress(
            id,
            userId,
            address,
        );
        this.logger.info('Updated Customer', { updatedCustomer });
        res.status(200).json({ updatedCustomer });
    };
}
