import React, { useRef } from "react";
import MasterLayout from "../components/common/desktop/appLayout/MasterLayout";
import MobileMasterLayout from "../components/common/mobile/appLayout/MobileMasterLayout";
import Utils from "../utils";
import { useTranslation, withTranslation } from "react-i18next";
import LoginForm from "../components/common/desktop/appLayout/components/pages/Auth/LoginForm";
import { connect } from "react-redux";
import { useEffect } from "react";
import Cart from "../components/common/desktop/appLayout/components/pages/Cart/Cart";
import { actions } from "../actions";

const { isMobileDevice } = Utils;
const isMobile = isMobileDevice();

const CartPage = (props) => {
  const { t, title } = props;
  useEffect(() => {
    if (title) document.title = title;
  }, []);
  useEffect(() => {
    // Cập nhập document title sử dụng browser API
    const hotNew= document.querySelector(".hot-new")
    if(hotNew)
      hotNew.classList.add("remove-hotnew")
  });
  return !isMobile ? (
    <MasterLayout {...props} t={t} Component={Cart} dataList={props.dataList} removeCart={props.removeCart} createOrderSection={props.createOrderSection} changeQuantity={props.changeQuantity}/>
  ) : (
    <MobileMasterLayout {...props} t={t} Component={Cart}/>
  );
};

const mapStateToProps = (state) => ({
  dataList:state.cart.cartListData
});

const mapDispatchToProps = (dispatch) => ({
  removeCart: (payload) => dispatch(actions.removeItemCart(payload)),
  changeQuantity: (payload) => dispatch(actions.changeQuantity(payload)),
  createOrderSection: (payload) => dispatch(actions.createOrderSection(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation(['navigationBar','cartPage'])(CartPage));
