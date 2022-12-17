import { actionTypes, reduxUtil } from "../actions/cart";
import { StorageKeys } from "../constants";
const {
  createReducer,
  defineActionSuccess,
  defineActionLoading,
  defineActionFailed,
} = reduxUtil;

const { ADD_ITEM_CART, REMOVE_ITEM_CART, SHOW_MODAL_CART, CLOSE_MODAL_CART,CHANGE_QUANTITY_CART,CREATE_ORDER_SECTION } =
  actionTypes;

const cartListData = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cartListData,
  cartProduct: {},
  orderSection:{},
  modalStatus: false,
};

const reducer = createReducer(
  {
    [defineActionSuccess(ADD_ITEM_CART)]: (state, { product }) => {
      const existItem = state.cartListData.find((x) => {
        if (x.id === product.id) {
          if (
            product.color?.id === x.color?.id &&
            product.size?.id === x.size?.id
          ) {
            return x;
          }
          return undefined;
        } else return undefined;
      });
      if (existItem === undefined || existItem === false)
        return {
          ...state,
          cartListData: [...state.cartListData, { ...product, quantity: 1 }],
        };
      else
        return {
          ...state,
          cartListData: [...state.cartListData],
        };
    },
    [defineActionSuccess(CREATE_ORDER_SECTION)]: (state, { orderSection }) => {
      return {
        ...state,
        orderSection,
      };
    },
    [defineActionSuccess(SHOW_MODAL_CART)]: (state, { product }) => {
      return {
        ...state,
        cartProduct: product,
        modalStatus: true,
      };
    },
    [defineActionSuccess(REMOVE_ITEM_CART)]: (state, { product }) => {
      return {
        ...state,
        cartListData: state.cartListData.filter(
          (x) =>
            x.id !== product.id &&
            x.size.id !== product.size.id &&
            x.color.id !== product.color.id
        ),
      };
    },
    [defineActionSuccess(CHANGE_QUANTITY_CART)]: (state, { product }) => {
      let data= state.cartListData.map((item, index)=>{
        if(index === product.id){
          return {
            ...item,
            quantity:product.quantity
          }
        }
        return item
      })
      return {
        ...state,
        cartListData: [...data],
      };
    },
    [defineActionSuccess(CLOSE_MODAL_CART)]: (state) => {
      return {
        ...state,
        modalStatus: false,
      };
    },
  },
  initialState
);

export default {
  reducer,
};
