import { Request, Response } from 'express';

export type AuthCookie = {
    accessToken: string;
};

export interface AuthRequest extends Request {
    auth: {
        sub: string;
        role: string;
        id?: string;
        tenant: string;
        firstName: string;
        lastName: string;
        email: string;
    };
}

export enum PriceType {
    BASE = 'base',
    ADDITIONAL = 'additional',
}
export interface PriceConfiguration {
    priceType: 'base' | 'additional';
    availableOptions: {
        [key: string]: number;
    };
}
export interface ProductPricingCache {
    productId: string;
    priceConfiguration: PriceConfiguration;
}
export interface ProductMessage {
    id: string;
    priceConfiguration: PriceConfiguration;
}
export interface ToppingPriceCache {
    _id: string;
    toppingId: string;
    price: number;
    tenantId: string;
}
export interface ToppingMessage {
    id: string;
    price: number;
    tenantId: string;
}

export interface ProductPriceConfiguration {
    [key: string]: {
        priceType: 'base' | 'aditional';
        availableOptions: {
            [key: string]: number;
        };
    };
}

export type Product = {
    _id: string;
    name: string;
    image: string;
    description: string;
    priceConfiguration: ProductPriceConfiguration;
};

export type Topping = {
    id: string;
    name: string;
    price: number;
    image: string;
};

export interface CartItem
    extends Pick<Product, '_id' | 'name' | 'image' | 'priceConfiguration'> {
    chosenConfiguration: {
        priceConfiguration: {
            [key: string]: string;
        };
        selectedToppings: Topping[];
    };
    qty: number;
}
