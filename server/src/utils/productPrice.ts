export const calculatePrice = (price: number, discountPercent = 0) => {
  return {
    price,
    discountPercent,
    finalPrice: price - discountPercent / 100,
  };
};
