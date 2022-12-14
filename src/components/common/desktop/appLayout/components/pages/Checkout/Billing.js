import { Form, Input, Row, Col, Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Billing = ({ product, onNext, setFormData, formRef, scrollTop }) => {
  const handleSubmit = (formValue) => {
    setFormData(formValue, 2);
    onNext(2);
    scrollTop()
  };

  const [bill, setBill] = useState(true);
  return (
    <Form onFinish={handleSubmit} ref={formRef}>
      <div className="checkout__billing">
        <div className="checkout__part-info">
          <div className="content__title">
            Địa chỉ thanh toán của bạn là gì?
          </div>

          <Form.Item name="delivery">
            <div className="login__option">
              <input
                type="checkbox"
                onChange={() => setBill(!bill)}
                className="checkout__checkbox"
                value={bill}
                checked={bill}
              />
              <label>Thanh toán khớp với địa chỉ giao hàng</label>
            </div>
          </Form.Item>
          {!bill ? (
            <>
              <Form.Item
                name="firstName"
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
                  className="checkout__input input"
                  placeholder="Họ"
                />
              </Form.Item>
              <Form.Item
                name="lastName"
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
                  className="checkout__input input"
                  placeholder="Tên"
                />
              </Form.Item>

              <Form.Item
                name="address1"
                rules={[
                  {
                    type: "text",
                    message: "The input is not valid address!",
                  },
                  {
                    required: true,
                    message: "Please input your address!",
                  },
                ]}
              >
                <Input
                  type="text"
                  className="checkout__input input"
                  placeholder="Địa chỉ số 1"
                />
              </Form.Item>

              <Form.Item
                name="address2"
                rules={[
                  {
                    type: "text",
                    message: "The input is not valid address!",
                  },
                  {
                    message: "Please input your address!",
                  },
                ]}
              >
                <Input
                  type="text"
                  className="checkout__input input"
                  placeholder="Địa chỉ số 2"
                />
              </Form.Item>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="postalCode"
                    rules={[
                      {
                        type: "number",
                        message: "The input is not valid postal code!",
                      },
                      {
                        required: true,
                        message: "Please input your postal code!",
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      maxLength={6}
                      className="checkout__input input"
                      placeholder="Mã bưu điện"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="cityName"
                    rules={[
                      {
                        type: "text",
                        message: "The input is not valid city name!",
                      },
                      {
                        required: true,
                        message: "Please input your city name!",
                      },
                    ]}
                  >
                    <Input
                      type="text"
                      className="checkout__input input"
                      placeholder="Tên thành phố"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Input
                value="Việt Nam"
                className="checkout__input input"
                suffix={<span className="checkout__dot"></span>}
              />
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="checkout__part-info">
          <button className="round-button" type="submit">
            Tiếp tục
          </button>
        </div>
      </div>
    </Form>
  );
};

export default Billing;
