import { CartInterface } from "../pages/coupon";

interface CalculateParams {
  total_price: number;
  discount: number;
  type: "FIXED" | "PERCENTAGE" | "BY_ITEM" | "POINT" | "SPECIAL";
  cart: CartInterface[];
  category?: string;
  every?: number;
}

export function calculateDiscount(params: CalculateParams): number {
  const { total_price, discount, type, cart, category, every } = params;

  let result = total_price;

  switch (type) {
    case "FIXED":
      result -= discount;
      break;

    case "PERCENTAGE":
      result -= result * (discount / 100);
      break;

    case "BY_ITEM":
      cart.forEach((c) => {
        if (c.item.category == category) {
          let fixed_discount = c.amount * c.item.price * (discount / 100);
          result -= fixed_discount;
        }
      });
      break;

    case "POINT":
      const capped = total_price * 0.2;
      if (discount > capped) {
        result -= capped;
      } else {
        result -= discount;
      }
      break;
    case "SPECIAL":
      if (every) {
        const total_discount = Math.floor(total_price / every) * discount;
        result -= total_discount;
      }
      break;
  }

  return result;
}