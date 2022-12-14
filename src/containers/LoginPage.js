import React, { useRef } from "react";
import MasterLayout from "../components/common/desktop/appLayout/MasterLayout";
import MobileMasterLayout from "../components/common/mobile/appLayout/MobileMasterLayout";
import Utils from "../utils";
import { showErrorMessage } from "../services/notifyService";
import { useTranslation, withTranslation } from "react-i18next";
import LoginForm from "../components/common/desktop/appLayout/components/pages/Auth/LoginForm";
import { connect } from "react-redux";
import { useEffect } from "react";
import { actions } from "../actions";
import { UserTypes } from "../constants";
import { useState } from "react";
const { getUserData } = actions;

const { isMobileDevice } = Utils;
const isMobile = isMobileDevice();

const LoginPage = (props) => {
  const { t, title } = props;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (title) document.title = title;
  }, []);

  const onLogin = (valueForm) => {
    const { login, setUserData } = props;
    setLoading(true);
    login({
      params: valueForm,
      onCompleted: (responseData) => {
        if (responseData && responseData.token) {
          if (setUserData(responseData)) {
            if (responseData.kind === UserTypes.CUSTOMER)
              redirectToAuthPage();
          }
        } else {
          setLoading(false);
          showErrorMessage(
            "Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại!"
          );
        }
      },
      onError: (err) => {
        setLoading(false);
        showErrorMessage(
          "Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại!"
        );
      },
    });
  };

  const redirectToAuthPage = () => {
    props.history.push("/");
  };

  useEffect(() => {
    // Cập nhập document title sử dụng browser API
    const hotNew = document.querySelector(".hot-new");
    if (hotNew) hotNew.classList.add("remove-hotnew");
  });
  return !isMobile ? (
    <MasterLayout
      {...props}
      t={t}
      Component={LoginForm}
      onLogin={onLogin}
      loading={loading}
    />
  ) : (
    <MobileMasterLayout
      {...props}
      t={t}
      Component={LoginForm}
      onLogin={onLogin}
      loading={loading}
    />
  );
};

const mapStateToProps = (state) => ({
  loading: state.account.loading,
});

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(actions.login(payload)),
  setUserData: (data) => actions.setUserData(data),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation(["navigationBar", "loginPage"])(LoginPage));
