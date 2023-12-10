const totalPriceCounter = (cartItems) => {
  let totalPrice = 0;
  cartItems.forEach((item) => {
    totalPrice += item.price;
  });
  return totalPrice;
};

export default totalPriceCounter;
