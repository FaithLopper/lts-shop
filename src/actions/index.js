import {
  actions as accountActions,
  actionTypes as accountTypes,
} from "./account";
import {actions as newsActions, actionTypes as newsTypes} from './news';
import {actions as categoryActions, actionTypes as categoryTypes} from './category';
import {actions as productActions, actionTypes as productTypes} from './product';
import {actions as cartActions, actionTypes as cartTypes} from './cart';
import {actions as orderActions, actionTypes as orderTypes} from './order';
import {actions as locationActions, actionTypes as locationTypes} from './location';
import {actions as profileActions, actionTypes as profileTypes} from './profile';

export const actions = {
  ...accountActions,
  ...newsActions,
  ...categoryActions,
  ...productActions,
  ...cartActions,
  ...orderActions,
  ...locationActions,
  ...profileActions,
};

export const types = {
  ...accountTypes,
  ...newsTypes,
  ...categoryTypes,
  ...productTypes,
  ...cartTypes,
  ...orderTypes,
  ...locationTypes,
  ...profileTypes,
};
