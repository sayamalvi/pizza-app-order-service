import couponModel from './coupon-model';

export class CouponService {
    async createCoupon(
        title: string,
        code: string,
        validUpto: Date,
        discount: number,
        tenantId: number,
    ) {
        const coupon = await couponModel.create({
            title,
            code,
            discount,
            validUpto,
            tenantId,
        });

        return coupon;
    }

    async verifyCoupon(code: string, tenantId: number) {
        const coupon = await couponModel.findOne({ code, tenantId });
        return coupon
    }
}
