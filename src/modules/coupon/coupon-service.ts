import couponModel from './coupon-model';

export class CouponService {
    async createCoupon(
        title: string,
        code: string,
        validUpto: Date,
        discount: number,
        tenant: number,
    ) {
        const coupon = await couponModel.create({
            title,
            code,
            discount,
            validUpto,
            tenant,
        });

        return coupon;
    }

    async verifyCoupon(code: string, tenant: number) {
        const coupon = await couponModel.findOne({ code, tenant });
        return coupon
    }
}
