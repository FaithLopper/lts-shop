import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../../../../../assets/svg/logo-500.svg";
import { Form, Input, Checkbox, Row, Col } from "antd";
const LoginForm = ({onLogin,loading}) => {
  const handleSubmit = (formValue) => {
    onLogin(formValue)
  };
  return (
    <section className="login section" id="login">
      <div className="login__container">
        <img src={Logo} alt="" className="login__logo" />
        <div className="login__title">
          long term support <br /> your account
        </div>
        <Form onSubmit={handleSubmit} className="login__form">
          <Form.Item
            name="username"
            rules={[
              {
                type: "text",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              type="text"
              name="username"
              className="login__input input"
              placeholder="Tên đăng nhập"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                type: "password",
                message: "The input is not valid password!",
              },
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              type="password"
              name="password"
              className="login__input input"
              placeholder="Mật khẩu"
            />
          </Form.Item>

          <Form.Item name="keep-login">
            <div className="login__option">
                <input
                  type="checkbox"
                  id="keep-login"
                  className="login__checkbox"
                />
              <label for="keep-login"> Giữ đăng nhập</label>
              <Link to="#">Quên mật khẩu</Link>
            </div>
          </Form.Item>
          <div className="login__policy">
            Bằng cách đăng nhập, bạn đồng ý với  {" "}
            <Link to="#">Chính sách bảo mật</Link> và {" "}
            <Link to="#">Điều khoản sử dụng</Link> của cửa hàng
          </div>
          <button type="submit" className="login__button button">SIGN IN</button>
          <div className="login__register">
            Chưa có tài khoản? <Link to="/register">Đăng kí</Link>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default LoginForm;
