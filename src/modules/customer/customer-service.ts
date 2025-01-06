import { Logger } from 'winston';
import customerModel from './customer-model';
import { Address, CustomerData } from './customer-types';

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

    async addAddress(id: string, userId: string, address: Address) {
        const updatedCustomerDocument = await customerModel.findOneAndUpdate(
            { _id: id, userId: userId },
            {
                $push: {
                    addresses: {
                        text: address,
                        isDefault: false,
                    },
                },
            },
            { new: true },
        );
        return updatedCustomerDocument;
    }
}
