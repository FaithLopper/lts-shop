import { actionTypes, reduxUtil } from "../actions/news";

const {
  createReducer,
  defineActionSuccess,
  defineActionLoading,
  defineActionFailed,
} = reduxUtil;

const { GET_NEWS_LIST, GET_CATEGORY_AUTOCOMPLETE } = actionTypes;

const initialState = {
  newsListData: {},
  newsListLoading: false,
};

const reducer = createReducer({
  [defineActionLoading(GET_NEWS_LIST)]: (state) => {
    return {
      ...state,
      newsListLoading: true,
    };
  },
  [defineActionSuccess(GET_NEWS_LIST)]: (state, { newsListData }) => {
    return {
      ...state,
      newsListData,
      newsListLoading: false,
    };
  },
  [defineActionSuccess(GET_CATEGORY_AUTOCOMPLETE)]: (
    state,
    { categoryAutoComplete, kind }
  ) => {
    if (kind == 1) {
      return {
        ...state,
        categoryAutoCompleteNews: categoryAutoComplete,
      };
    }
  },
  initialState,
});

export default {
  reducer,
};
