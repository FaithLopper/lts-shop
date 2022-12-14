import React, { useRef } from "react";
import MasterLayout from "../components/common/desktop/appLayout/MasterLayout";
import MobileMasterLayout from "../components/common/mobile/appLayout/MobileMasterLayout";
import Utils from "../utils";
import { showErrorMessage } from "../services/notifyService";
import { useTranslation, withTranslation } from "react-i18next";
import ForgetPassForm from "../components/common/desktop/appLayout/components/pages/Auth/ForgetPassForm";
import { connect } from "react-redux";
import { useEffect } from "react";
import { actions } from "../actions";
import { UserTypes } from "../constants";
import { useState } from "react";
const { getUserData } = actions;

const { isMobileDevice } = Utils;
const isMobile = isMobileDevice();

const ForgetPassPage = (props) => {
  const { t, title } = props;

  useEffect(() => {
    if (title) document.title = title;
  }, []);



  useEffect(() => {
    // Cập nhập document title sử dụng browser API
    const hotNew = document.querySelector(".hot-new");
    if (hotNew) hotNew.classList.add("remove-hotnew");
  });
  return !isMobile ? (
    <MasterLayout
      {...props}
      t={t}
      Component={ForgetPassForm}
    />
  ) : (
    <MobileMasterLayout
      {...props}
      t={t}
      Component={ForgetPassForm}
    />
  );
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation(["navigationBar", "forgetPassPage"])(ForgetPassPage));
