import { ProductMessage } from '../../common/types';
import productCacheModel from './product-cache.model';

export const handleProductUpdate = async (value: string) => {
    try {
        const product: ProductMessage = JSON.parse(value);
        return await productCacheModel.updateOne(
            {
                productId: product.id,
            },
            {
                priceConfiguration: product.priceConfiguration,
            },
            { upsert: true },
        );
    } catch (error) {
        throw new Error('Failed to parse');
    }
};
