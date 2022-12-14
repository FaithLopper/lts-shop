import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../../../../../assets/svg/logo-500.svg";
import { Form, Input, Checkbox, Row, Col, Button, Spin } from "antd";
import { useDispatch } from "react-redux";
import { actions } from "../../../../../../../actions";
import {
  showErrorMessage,
  showSucsessMessage,
} from "../../../../../../../services/notifyService";
import { useState } from "react";
import OtpInput from "react-otp-input";
const ForgetPassForm = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(false);
  const [otp, setOtp] = useState("");
  const handleChange = (otp) => setOtp(otp);
  const handleSubmit = (formValues) => {
    setLoading(true);
    dispatch(
      actions.requestForget({
        params: {
          ...formValues,
        },
        onCompleted: (responseData) => {
          if (responseData.result === true) {
            setLoading(false);
            // showSucsessMessage(
            //   "Yêu cầu quên mật khẩu thành công, vui lòng kiểm tra email"
            // );
            setState(true)
          }else if(responseData.result === false){
            showErrorMessage("Tài khoản không tồn tại");
          }
          setLoading(false);
        },
        onError: (error) => {
          setLoading(false);
          showErrorMessage("Gửi yêu cầu thất bại, vui lòng thử lại");
          window.location.reload(false);
        },
      })
    );
  };

  const handleOtp =()=>{

  }

  return (
    <section
      className="login section"
      id="forget-password"
      style={{
        paddingTop: "5rem",
        paddingBottom: "7rem",
      }}
    >
      <div className="login__container">
        <img src={Logo} alt="" className="login__logo" />
        <div className="login__title">
          long term support <br /> your account
        </div>
        {loading ? <Spin size="large"/> :
        !state ? (
            <Form onFinish={handleSubmit} className="login__form" style={{
                marginTop:"3rem"
            }}>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "text",
                    message: "The input is not valid email!",
                  },
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input
                  type="email"
                  name="username"
                  className="login__input input"
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item name="keep-login">
                <Button
                  htmlType="submit"
                  className="login__button button"
                  loading={loading}
                >
                  SEND
                </Button>
              </Form.Item>
              <div className="login__policy">
                Nhập email đã đăng kí để nhận mật khẩu
              </div>
            </Form>
          ) : (
            <>
            <OtpInput
              value={otp}
              className="otp-input"
              onChange={handleChange}
              numInputs={4}
              separator={<span>-</span>}
              style={{
                marginTop:"3rem"
            }}
            />
              <div className="login__policy">
                Nhập mã OTP được gửi qua email  
              </div>
              <Button
                  className="login__button button"
                  style={{
                    width:"fit-content"
                  }}
                  loading={loading}
                  onClick={handleOtp}
                >
                  SEND
                </Button>
            </>
          )
        }
      </div>
    </section>
  );
};

export default ForgetPassForm;
