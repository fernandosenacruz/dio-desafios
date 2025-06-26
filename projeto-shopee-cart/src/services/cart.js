const addItemToCart = async (cart, item) => {
  cart.push(item);
};

const removeItemFromCart = async (cart, itemId) => {
  const itemIndex = cart.findIndex((item) => item.id === itemId);

  if (itemIndex == -1) {
    console.log("Item not found in the cart.");
    return;
  }

  if (cart[itemIndex].quantity > 1) {
    cart[itemIndex].quantity--;
    return;
  }

  cart.splice(itemIndex, 1);
};

const showCart = async (cart) => {
  if (cart.length === 0) {
    console.log("Empty cart.");
    return;
  }

  console.log("\nShopee cart list:");
  cart.forEach((item, index) => {
    console.log(
      `${index + 1}. ${item.name} - R$ ${item.price} | ${
        item.quantity
      } x | Subtotal = ${item.subtotal()}`
    );
  });
};

const calculateTotal = async (cart) => {
  console.log("\nShopee Cart TOTAL IS");
  const total = cart.reduce((total, item) => total + item.subtotal(), 0);
  console.log(`🎁 Total: R$ ${total.toFixed(2)}`);
};

export {
  addItemToCart,
  removeItemFromCart,
  showCart,
  calculateTotal,
};
