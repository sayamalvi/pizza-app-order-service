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

// export interface ResponseModel extends Response {

// }

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
    toppingId: string;
    price: number;
    tenantId: string;
  }
  export interface ToppingMessage {
    id: string;
    price: number;
    tenantId: string;
  }