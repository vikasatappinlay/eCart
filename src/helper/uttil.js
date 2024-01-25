import store from '../reducer/store';
export const addToCard = item => {
  const {itemStore} = store.getState();
  let newItemStore = itemStore;
  let index = newItemStore.findIndex(obj => obj.id === item.id);
  if (index >= 0) {
    newItemStore[index].count = newItemStore[index].count + 1;
  } else {
    item.count = 1;
    newItemStore.push(item);
  }
  store.dispatch({type: 'ADD_COUNT', payload: newItemStore});
};
export const removeFromCart = item => {
  const {itemStore} = store.getState();
  let newItemStore = itemStore;
  let index = newItemStore.findIndex(obj => obj.id === item.id);
  if (index >= 0) {
    newItemStore[index].count = newItemStore[index].count - 1;
  }
  if (newItemStore[index].count <= 0) {
    newItemStore.splice(index, 1);
  }
  store.dispatch({type: 'ADD_COUNT', payload: newItemStore});
};
export const getTotal = () => {
  const {itemStore} = store.getState();
  let total = 0;
  itemStore.map(item => (total = item.price * item.count + total));
  return total;
};
export const getOfferPrice = item => {
  return Math.round((item.price * item.discountPercentage) / 100);
};
