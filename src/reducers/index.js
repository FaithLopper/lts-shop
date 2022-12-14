import { combineReducers } from "redux";
import account from "./account";
// import landing from './landing';
import category from "./category";
import product from "./product";
import news from "./news";
import cart from './cart';
const rootReducer = combineReducers({
  category: category.reducer,
  product : product.reducer,
  account: account.reducer,
  news: news.reducer,
  cart: cart.reducer,
});

export default rootReducer;
