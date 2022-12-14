import { actionTypes, reduxUtil } from "../actions/category";

const {
  createReducer,
  defineActionSuccess,
  defineActionLoading,
  defineActionFailed,
} = reduxUtil;
const { GET_CATEGORY_LIST } = actionTypes;

const initialState = {
  categoryList: [],
  getCategoryListLoading: false,
};

const reducer = createReducer({
  [defineActionLoading(GET_CATEGORY_LIST)]: (state) => {
    return {
      ...state,
      getCategoryListLoading: true,
    };
  },
  [defineActionSuccess(GET_CATEGORY_LIST)]: (state, { categoryData }) => {
    return {
      ...state,
      categoryList: categoryData,
      getCategoryListLoading: false,
    };
  },
  [defineActionFailed(GET_CATEGORY_LIST)]: (state) => {
    return {
      ...state,
      getCategoryListLoading: false,
    };
  },
},initialState);

const category = { reducer };

export default category;
