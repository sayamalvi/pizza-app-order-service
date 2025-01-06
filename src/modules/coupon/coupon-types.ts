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

export interface CreateCouponRequest {
    body: {
        title: string;
        code: string;
        validUpto: Date;
        discount: number;
        tenant: number;
    };
}

export interface VerifyCouponRequest {
    body: {
        code: string;
        tenant: number;
    };
}
