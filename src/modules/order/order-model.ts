import mongoose from 'mongoose';
import { Order, OrderStatus, PaymentMode, PaymentStatus } from './order-types';
import { CartItem, PriceType } from '../../common/types';

const toppingSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});
const cartSchema = new mongoose.Schema<CartItem>({
    name: String,
    image: String,
    qty: Number,
    priceConfiguration: {
        type: Map,
        of: {
            priceType: {
                type: String,
                enum: PriceType,
                required: true,
            },
            availableOptions: {
                type: Map,
                of: Number,
                required: true,
            },
        },
    },
    chosenConfiguration: {
        priceConfiguration: {
            type: Map,
            of: String,
            required: true,
        },
        selectedToppings: {
            type: [toppingSchema],
            required: true,
        },
    },
});
const orderSchema = new mongoose.Schema<Order>(
    {
        cart: {
            type: [cartSchema],
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Customer',
        },
        deliveryCharges: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
        },
        taxes: {
            type: Number,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        tenantId: {
            type: String,
            required: true,
            ref: 'Tenant',
        },
        orderStatus: {
            type: String,
            enum: OrderStatus,
        },
        paymentMode: {
            type: String,
            enum: PaymentMode,
        },
        paymentStatus: {
            type: String,
            enum: PaymentStatus,
        },
        paymentId: {
            type: String,
            required: false,
            default: null,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Order', orderSchema);
