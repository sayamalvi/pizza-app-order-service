import { Logger } from 'winston';
import customerModel from './customer-model';
import { CustomerData } from './customer-types';

export class CustomerService {
    constructor(private readonly logger: Logger) {}

    async getCustomer(customerData: CustomerData) {
        const customer = await customerModel.findOne({
            userId: customerData.userId,
        });

        if (!customer) {
            return await customerModel.create(customerData);
        }

        return customer;
    }
}
