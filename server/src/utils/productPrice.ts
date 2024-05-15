export const calculatePrice = (price: number, discountPercent = 0) => {
  return {
    price,
    discountPercent,
    finalPrice: price - price * (discountPercent / 100),
  };
};
