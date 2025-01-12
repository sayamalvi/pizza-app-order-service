import { NextFunction, Response } from 'express';
import { Logger } from 'winston';
import { CouponService } from './coupon-service';
import { CreateCouponRequest, VerifyCouponRequest } from './coupon-types';
import createHttpError from 'http-errors';

export class CouponController {
    constructor(
        private readonly logger: Logger,
        private readonly couponService: CouponService,
    ) {}
    create = async (req: CreateCouponRequest, res: Response) => {
        const { title, code, validUpto, discount, tenant } = req.body;
        const coupon = await this.couponService.createCoupon(
            title,
            code,
            validUpto,
            discount,
            tenant,
        );
        res.json(coupon);
    };
    verify = async (
        req: VerifyCouponRequest,
        res: Response,
        next: NextFunction,
    ) => {
        const { code } = req.body;
        const coupon = await this.couponService.verifyCoupon(code);
        if (!coupon) {
            const error = createHttpError(400, 'Coupon does not exists');
            return next(error);
        }

        const currentDate = new Date();
        const couponDate = new Date(coupon.validUpto);

        if (currentDate <= couponDate) {
            this.logger.info(`Coupon ${coupon.code} verified`);
            return res.json({ valid: true, discount: coupon.discount });
        }

        return res.json({ valid: false, discount: 0 });
    };
}
