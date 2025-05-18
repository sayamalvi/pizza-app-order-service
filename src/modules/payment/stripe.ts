import Stripe from 'stripe';
import { PaymentGW, PaymentOptions } from './payment-types';
import config from 'config';

export class StripeGW implements PaymentGW {
    private stripe: Stripe;
    constructor() {
        this.stripe = new Stripe(config.get('stripe.secretKey'));
    }
    async createSession(options: PaymentOptions) {
        const session = await this.stripe.checkout.sessions.create(
            {
                // get customer email from database
                // customer_email: 
                metadata: {
                    orderId: options.orderId,
                },
                // todo: In future, capture structured address from customer
                // payment_intent_data: {
                //     shipping: {
                //         name: 'Sayam',
                //         address: {
                //             line1: 'Some line',
                //             city: 'Mumbai',
                //             country: 'India',
                //             postal_code: '302003',
                //         },
                //     },
                // },
                billing_address_collection: 'required',
                line_items: [
                    {
                        price_data: {
                            unit_amount: options.amount * 100,
                            product_data: {
                                name: 'Online Pizza Order',
                                description: 'Total Amount to be paid',
                                images: ['https://placehold.jp/150x150.png'],
                            },
                            currency: options.currency ?? 'inr',
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `http://localhost:3000/payment?success=true&orderId=${options.orderId}`,
                cancel_url: `http://localhost:3000/payment?success=true&orderId=${options.orderId}`,
            },
            { idempotencyKey: options.idempotencyKey },
        );
        return {
            id: session.id,
            paymentUrl: session.url,
            paymentStatus: session.payment_status,
        };
    }
    async getSession(id: string) {
        return null;
    }
}
