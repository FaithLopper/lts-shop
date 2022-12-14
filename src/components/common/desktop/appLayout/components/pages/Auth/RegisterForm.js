import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../../../../../assets/svg/logo-500.svg";
import { Form, Input, DatePicker, Radio, Button } from "antd";
import {
  convertDateTimeToString,
  convertLocalTimeToUtc,
  convertStringToDateTime,
  convertUtcToTimezone,
} from "../../../../../../../utils/datetimeHelper";
const RegisterForm = ({ registerUser, SubmitButton }) => {
  const handleSubmit = (values) => {
    let temp= {
      ...values,
      fullName:`${values.firstname} ${values.lastname}`,
      birthday: convertLocalTimeToUtc(
        convertDateTimeToString(values.birthday, "DD/MM/YYYY"),
        "DD/MM/YYYY"
      ),
    };
    registerUser(temp)
  };
  return (
    <section className="login section" id="login">
      <div className="login__container">
        <img src={Logo} alt="" className="login__logo" />
        <div className="login__title">BECOME OUR MEMBER</div>
        <div className="login__subtitle">
          Tạo tài khoản để có thể tiếp cận sớm nhất đến sản phẩm, bài viết và
          cộng đồng của chúng tôi.
        </div>
        <Form
          onFinish={handleSubmit}
          className="login__form"
          id="form-register"
        >
          <Form.Item
            name="username"
            rules={[
              {
                type: "text",
                message: "The input is not valid user name!",
              },
              {
                required: true,
                message: "Please input your user name!",
              },
            ]}
          >
            <Input
              type="text"
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
              className="login__input input"
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              type="email"
              className="login__input input"
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              // {
              //   type: "number",
              //   message: "The input is not valid phone!",
              // },
              {
                required: true,
                message: "Please input your user phone!",
              },
              { min: 10, message: "The input is not valid phone!" },
            ]}
          >
            <Input
              type="number"
              className="login__input input"
              placeholder="Số điện thoại"
            />
          </Form.Item>
          <Form.Item
            name="firstname"
            rules={[
              {
                type: "text",
                message: "The input is not valid first name!",
              },
              {
                required: true,
                message: "Please input your first name!",
              },
            ]}
          >
            <Input
              type="text"
              className="login__input input"
              placeholder="Họ"
            />
          </Form.Item>
          <Form.Item
            name="lastname"
            rules={[
              {
                type: "text",
                message: "The input is not valid last name!",
              },
              {
                required: true,
                message: "Please input your last name!",
              },
            ]}
          >
            <Input
              type="text"
              className="login__input input"
              placeholder="Tên"
            />
          </Form.Item>

          <Form.Item
            name="birthday"
            rules={[
              {
                type: "text",
                message: "The input is not valid birth day!",
              },
              {
                required: true,
                message: "Please input your birth day!",
              },
            ]}
          >
            <DatePicker
              className="input"
              placeholder="Ngày sinh"
              format="DD/MM/YYYY"
            />
          </Form.Item>

          <Form.Item
            name="gender"
            rules={[
              {
                required: true,
                message: "Please input your sex!",
              },
            ]}
          >
            <Radio.Group className="login__sex">
              <Radio.Button className="input login__sex-button" value={1}>
                Nam
              </Radio.Button>
              <Radio.Button className="input login__sex-button" value={2}>
                Nữ
              </Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="keep-login">
            <div className="login__option">
              <input
                type="checkbox"
                id="keep-login"
                className="login__checkbox"
              />
              <label for="keep-login" className="login__option-email">
                Đăng ký email để nhận thông tin cập nhật về các sản phẩm, ưu đãi
                và lợi ích Hội viên của bạn
              </label>
            </div>
          </Form.Item>
          <div className="login__policy">
            Bằng cách đăng nhập, bạn đồng ý với{" "}
            <Link to="#">Chính sách bảo mật</Link> và{" "}
            <Link to="#">Điều khoản sử dụng</Link> của cửa hàng
          </div>
          <SubmitButton />
          <div className="login__register">
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default RegisterForm;
