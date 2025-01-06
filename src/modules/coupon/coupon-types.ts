import { AuthRequest } from '../../common/types';
export interface Coupon {
    id: string;
    title: string;
    code: string;
    validUpto: Date;
    tenant: number;
    discount: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateCouponRequest extends AuthRequest {
    body: {
        title: string;
        code: string;
        validUpto: Date;
        discount: number;
        tenant: number;
    };
}

export interface VerifyCouponRequest extends AuthRequest {
    body: {
        code: string;
        tenant: number;
    };
}
