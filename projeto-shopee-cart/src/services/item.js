const createItem = async (item) => {
  return {
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    subtotal: () => item.price * item.quantity,
  };
};

export default createItem;
