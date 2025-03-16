import { Response } from 'express';
import {
    CartItem,
    ProductPricingCache,
    Topping,
    ToppingPriceCache,
} from '../../common/types';
import { CreateOrderRequest } from './order-types';
import productCacheModel from '../product-cache/product-cache.model';
import toppingCacheModel from '../topping-cache/topping-cache.model';
import couponModel from '../coupon/coupon-model';

export class OrderController {
    readonly create = async (req: CreateOrderRequest, res: Response) => {
        // TODO: validation
        const { cart } = req.body;
        const totalPrice = await this.calculateTotal(cart);
        let discountPercentage = 0;
        const couponCode = req.body.couponCode;
        const tenantId = req.body.tenant;
        if (couponCode) {
            discountPercentage = await this.getDiscountPercentage(
                couponCode,
                tenantId,
            );
        }
        const discountAmount = Math.round(
            (totalPrice * discountPercentage) / 100,
        );
        const priceAfterDiscount = totalPrice - discountAmount;
        const TAXES_PERCENT = 18;
        const taxes = Math.round((priceAfterDiscount * TAXES_PERCENT) / 100);
        // Store in db for each tenant or calculate
        const DELIVERY_CHARGES = 100;
        const finalTotal = priceAfterDiscount + taxes + DELIVERY_CHARGES;
        return res.json({ success: true, totalPrice, discountAmount, taxes, finalTotal });
    };

    private readonly getCurrentToppingPrice = (
        topping: Topping,
        toppingPricings: ToppingPriceCache[],
    ): number => {
        const currentTopping = toppingPricings.find(
            (current) => topping.id === current.toppingId,
        );

        if (!currentTopping) {
            // TODO: Make sure the item is in the cache else, maybe call catalog service.
            return topping.price;
        }

        return currentTopping.price;
    };

    private readonly getItemTotal = (
        item: CartItem,
        cachedProductPrice: ProductPricingCache | undefined,
        toppingsPricings: ToppingPriceCache[],
    ): number => {
        if (!cachedProductPrice) {
            throw new Error(
                `Product pricing not found for product ID: ${item._id}`,
            );
        }

        const toppingsTotal = item.chosenConfiguration.selectedToppings.reduce(
            (acc, curr) =>
                acc + this.getCurrentToppingPrice(curr, toppingsPricings),
            0,
        );

        const productTotal = Object.entries(
            item.chosenConfiguration.priceConfiguration,
        ).reduce((acc, [key, value]) => {
            const price =
                cachedProductPrice.priceConfiguration[key].availableOptions[
                    value
                ];
            return acc + price;
        }, 0);

        return productTotal + toppingsTotal;
    };

    private readonly calculateTotal = async (
        cart: CartItem[],
    ): Promise<number> => {
        if (cart.length === 0) return 0;

        const productIds = cart.map((item) => item._id);
        const productPricings = await productCacheModel.find({
            productId: { $in: productIds },
        });

        const cartToppingIds = cart.reduce((acc: string[], item) => {
            return [
                ...acc,
                ...item.chosenConfiguration.selectedToppings.map(
                    (topping) => topping.id,
                ),
            ];
        }, []);

        const toppingPrices = await toppingCacheModel.find({
            toppingId: { $in: cartToppingIds },
        });

        const totalPrice = cart.reduce((acc, curr) => {
            const cachedProductPrice = productPricings.find(
                (product) => product.productId === curr._id,
            );

            if (!cachedProductPrice) {
                throw new Error(
                    `Product pricing not found for product ID: ${curr._id}`,
                );
            }

            return (
                acc +
                curr.qty *
                    this.getItemTotal(curr, cachedProductPrice, toppingPrices)
            );
        }, 0);

        return totalPrice;
    };

    private readonly getDiscountPercentage = async (
        couponCode: string,
        tenantId: string,
    ) => {
        const code = await couponModel.findOne({
            code: couponCode,
            tenant: tenantId,
        });
        if (!code) {
            return 0;
        }
        const currentDate = new Date();
        const couponDate = new Date(code.validUpto);
        if (currentDate <= couponDate) {
            return code.discount;
        }
        return 0;
    };
}
