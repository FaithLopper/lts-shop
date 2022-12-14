import { call, put, takeEvery, takeLatest, select } from "redux-saga/effects";
import { actionTypes, reduxUtil } from "../actions/cart";

import apiConfig from "../constants/apiConfig";

import { sendRequest } from "../services/apiService";
import { handleApiResponse } from "../utils/apiHelper";
const { defineActionLoading, defineActionSuccess, defineActionFailed } =
  reduxUtil;

const {
  ADD_ITEM_CART,
  REMOVE_ITEM_CART,
  SHOW_MODAL_CART,
  CLOSE_MODAL_CART,
  CHANGE_QUANTITY_CART,
  CREATE_ORDER_SECTION,
} = actionTypes;

function* addItemCart({ payload: { params, onCompleted, onError } }) {
  const getItems = (state) => state.cart.cartListData;
  try {
    const itemsBefore = yield select(getItems);
    yield put({
      type: defineActionSuccess(ADD_ITEM_CART),
      product: params.product,
    });
    const items = yield select(getItems);
    localStorage.setItem("cartItems", JSON.stringify(items));
    if (itemsBefore.length !== items.length) {
      onCompleted(params.product);
    }
  } catch (error) {
    onError(error);
  }
}

function* removeItemCart({ payload: { params, onCompleted, onError } }) {
  const getItems = (state) => state.cart.cartListData;
  try {
    const itemsBefore = yield select(getItems);
    yield put({
      type: defineActionSuccess(REMOVE_ITEM_CART),
      product: params.product,
    });
    const items = yield select(getItems);
    localStorage.setItem("cartItems", JSON.stringify(items));
    if (itemsBefore.length !== items.length) {
      onCompleted(params.product);
    }
  } catch (error) {
    onError(error);
  }
}

function* showModalCart({ payload: { params } }) {
  try {
    yield put({
      type: defineActionSuccess(SHOW_MODAL_CART),
      product: params.product,
    });
  } catch (error) {
    console.log(error);
  }
}

function* closeModalCart({ payload }) {
  try {
    yield put({
      type: defineActionSuccess(CLOSE_MODAL_CART),
    });
  } catch (error) {
    console.log(error);
  }
}

function* changeQuantityCart({ payload: { params } }) {
  const getItems = (state) => state.cart.cartListData;
  try {
    yield put({
      type: defineActionSuccess(CHANGE_QUANTITY_CART),
      product: params.product,
    });
    const items = yield select(getItems);
    localStorage.setItem("cartItems", JSON.stringify(items));
  } catch (error) {
    console.log(error);
  }
}

function* createOrderSection({ payload: { params, onCompleted, onError } }) {
  const getItems = (state) => state.cart.cartListData;
  try {
    const items = yield select(getItems);
    let orderItems = items.map((_item) => {
      let color = {
        configId: null,
        variantIds: [],
      };
      let size = {
        configId: null,
        variantIds: [],
      };
      let productConfigs = [];
      if (_item.productConfigs) {
        _item.productConfigs.map((item) => {
          if (item.name === "color") {
            color.configId = item.id;
            if (item.variants) {
              item.variants.map((_color) => {
                if (_color.id === _item.color.id) {
                  color.variantIds.push(_color.id);
                }
              });
            }
          }

          if (item.name === "size") {
            size.configId = item.id;
            if (item.variants) {
              item.variants.map((_size) => {
                if (_size.id === _item.size.id) {
                  size.variantIds.push(_size.id);
                }
              });
            }
          }
        });
      }
      productConfigs.push(color);
      productConfigs.push(size);
      return {
        productConfigs,
        productId: _item.id,
        quantity: _item.quantity,
      };
    });
    yield put({
      type: defineActionSuccess(CREATE_ORDER_SECTION),
      orderSection: {
        orderItems,
        price: params.price,
      },
    });
    onCompleted(parseInt(Date.now() + Math.random()));
  } catch (error) {
    console.log(error);
  }
}
const sagas = [
  takeLatest(actionTypes.ADD_ITEM_CART, addItemCart),
  takeLatest(actionTypes.REMOVE_ITEM_CART, removeItemCart),
  takeLatest(actionTypes.SHOW_MODAL_CART, showModalCart),
  takeLatest(actionTypes.CLOSE_MODAL_CART, closeModalCart),
  takeLatest(actionTypes.CHANGE_QUANTITY_CART, changeQuantityCart),
  takeLatest(actionTypes.CREATE_ORDER_SECTION, createOrderSection),
];

export default sagas;
