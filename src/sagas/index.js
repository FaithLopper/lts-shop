import { all } from "redux-saga/effects";
import category from "./category";
import product from "./product";
import account from './account'
import news from './news';
import cart from './cart';
import order from './order';
import location from './location';
import profile from './profile';
const sagas = [
  // ...landing,
  ...category,
  ...product,
  ...account,
  ...news,
  ...cart,
  ...order,
  ...location,
  ...profile,
];

function* rootSaga() {
  yield all(sagas);
}

export default rootSaga;
