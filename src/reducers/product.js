import { actionTypes, reduxUtil } from "../actions/product";

const {
  createReducer,
  defineActionSuccess,
  defineActionLoading,
  defineActionFailed,
} = reduxUtil;
const { GET_PRODUCT_LIST } = actionTypes;

const initialState = {
  productList: [],
  getProductListLoading: false,
};

const reducer = createReducer(
  {
    [defineActionLoading(GET_PRODUCT_LIST)]: (state) => {
      return { ...state, getProductListLoading: true };
    },
    [defineActionSuccess(GET_PRODUCT_LIST)]: (state, { productData }) => {
      state.productList.push(productData);
      return { ...state, getProductListLoading: false };
    },
    [defineActionFailed(GET_PRODUCT_LIST)]: (state) => {
      return {
        ...state,
        getProductListLoading: false,
      };
    },
  },
  initialState
);

const product = { reducer };

export default product;
