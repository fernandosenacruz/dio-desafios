import createItem from "./services/item.js";
import {
  addItemToCart,
  calculateTotal,
  removeItemFromCart,
  showCart,
} from "./services/cart.js";

import ITEMS from "./items.js";

const cartList = [];

const randomId = () => {
  return Math.floor(Math.random() * 5) + 1;
};

const createRandomItems = async (quantity = 2) => {
  const randomItems = [];
  for (let i = 0; i < quantity; i++) {
    const randomItem = ITEMS[randomId() - 1];
    const item = await createItem(randomItem);
    const existingItem = randomItems.find((i) => i.id === item.id);
    existingItem ? existingItem.quantity++ : randomItems.push(item);
  }
  return randomItems;
};

const main = async () => {
  console.log("Welcome to the your Shopee Cart!");

  const randomItems = await createRandomItems(5);

  for (const item of randomItems) {
    await addItemToCart(cartList, item);
  }

  console.log("Items added to the cart:");
  await showCart(cartList);

  await removeItemFromCart(cartList, randomItems[0].id);
  await calculateTotal(cartList);
};

main();
