import React, { useRef } from "react";
import MasterLayout from "../components/common/desktop/appLayout/MasterLayout";
import MobileMasterLayout from "../components/common/mobile/appLayout/MobileMasterLayout";
import Utils from "../utils";
import { useTranslation, withTranslation } from "react-i18next";
import RegisterForm from "../components/common/desktop/appLayout/components/pages/Auth/RegisterForm";
import { connect } from "react-redux";
import { useEffect } from "react";
import { actions } from "../actions";
import { useState } from "react";
import { Button, Form } from "antd";
import { errorCodeHandle } from "../utils/apiHelper";
import { showErrorMessage, showSucsessMessage } from "../services/notifyService";

const { isMobileDevice } = Utils;
const isMobile = isMobileDevice();

const RegisterPage = (props) => {
  const { t, title, createData } = props;
  const [isSubmit, setSubmit] = useState(false);
  useEffect(() => {
    if (title) document.title = title;
  }, []);
  useEffect(() => {
    // Cập nhập document title sử dụng browser API
    const hotNew = document.querySelector(".hot-new");
    if (hotNew) hotNew.classList.add("remove-hotnew");
  });

  const registerUser = (formvalue) => {
    setSubmit(true);
    createData({
      params: formvalue,
      onCompleted: (responseData) => {
        setSubmit(false);
        errorCodeHandle(responseData) ? showErrorMessage(errorCodeHandle(responseData)) :showSucsessMessage("Tạo tài khoản thành công !!!")
        if(!errorCodeHandle(responseData)){
            window.location.href='/login'
        }
      },
      onError: (error) => {
        setSubmit(false);
        console.log(error);
      },
    });
  };

  const submitButton = () => {
    return (
      <Form.Item>
        <Button
          htmlType="submit"
          className="login__button button"
          loading={isSubmit}
          form='form-register'
        >
          SIGN IN
        </Button>
      </Form.Item>
    );
  };

  return !isMobile ? (
    <MasterLayout
      {...props}
      t={t}
      Component={RegisterForm}
      registerUser={registerUser}
      SubmitButton={submitButton}
    />
  ) : (
    <MobileMasterLayout
      {...props}
      t={t}
      Component={RegisterForm}
      registerUser={registerUser}
      SubmitButton={submitButton}
    />
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  createData: (payload) => dispatch(actions.register(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation(["navigationBar", "registerPage"])(RegisterPage));
