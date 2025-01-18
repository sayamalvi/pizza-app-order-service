import { ToppingMessage } from '../../common/types/index';
import toppingCacheModel from "./topping-cache.model";

export const handleToppingUpdate = async (value: string) => {
  // todo: wrap this parsing in try catch
  const topping: ToppingMessage = JSON.parse(value);

  return await toppingCacheModel.updateOne(
    {
      toppingId: topping.id,
    },
    {
      $set: {
        price: topping.price,
        tenantId: topping.tenantId,
      },
    },
    { upsert: true },
  );
};