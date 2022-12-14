import React, { useRef } from "react";
import MasterLayout from "../components/common/desktop/appLayout/MasterLayout";
import MobileMasterLayout from "../components/common/mobile/appLayout/MobileMasterLayout";
import Utils from "../utils";
import { useTranslation, withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { useEffect } from "react";
import NewDetail from "../components/common/desktop/appLayout/components/pages/New/NewDetail";
import { actions } from "../actions";
import { useState } from "react";
import ProductDetail from "../components/common/desktop/appLayout/components/pages/Product/ProductDetail";

const { isMobileDevice } = Utils;
const isMobile = isMobileDevice();

const ProductDetailPage = (props) => {
  const { t, title } = props;
  var detailId = props.match?.params?.id;
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState(false);
  useEffect(() => {
    if (title) document.title = title;
    getDetail(detailId);
  }, []);
  useEffect(() => {
    // Cập nhập document title sử dụng browser API
    const hotNew = document.querySelector(".hot-new");
    if (hotNew) hotNew.classList.add("remove-hotnew");
  }, []);

  const getDetail = (id) => {
    const { getDataById } = props;
    const params = { id };
    setLoading(true);
    getDataById({
      params,
      onCompleted: (responseData) => {
        if (responseData.result) {
          setLoading(false);
          setDetail(responseData.data);
        }
      },
      onError: (err) => {
        setLoading(false);
        console.log(err);
      },
    });
  };
  return !isMobile ? (
    <MasterLayout
      {...props}
      t={t}
      Component={ProductDetail}
      addCart={props.addCart}
      showModalCart={props.showModalCart}
      loading={loading}
      dataConfig={detail}
    />
  ) : (
    <MobileMasterLayout
      {...props}
      t={t}
      Component={ProductDetail}
      detail={detail}
    />
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  getDataById: (payload) => dispatch(actions.getProductById(payload)),
  addCart: (payload) => dispatch(actions.addItemCart(payload)),
  showModalCart: (payload) => dispatch(actions.showModalCart(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation(["navigationBar", "ProductDetailPage"])(ProductDetailPage));
