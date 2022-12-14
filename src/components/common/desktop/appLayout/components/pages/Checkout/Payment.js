import { Form, Input, Row, Col, Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
const Payment = ({loading, product, onNext, setFormData, formRef, scrollTop,handleSubmit }) => {
    const history = useHistory()
  // const handleSubmit = (formValue) => {
  //   setFormData(
  //     {
  //       type: "COD",
  //     },
  //   );
  // };
  return (
    <Form onFinish={handleSubmit} ref={formRef}>
      <div className="payment__shipping">
        <div className="payment__part-info">
          <div className="content__title">
            Nhập mã giảm giá của bạn?
          </div>
          <Form.Item
            name="promoCode"
            rules={[
              {
                type: "text",
                message: "The input is not valid promo code!",
              },
              {
                required: false,
                message: "Please input your promo code!",
              },
            ]}
          >
            <Input
              type="text"
              className="checkout__input input"
              placeholder="Mã giảm giá"
            />
          </Form.Item>
        </div>
        <div className="payment__part-info">
          <div className="content__title">
            Bạn muốn thanh toán bằng hình thức nào?
          </div>
          <Button className="big-button round-button-white">
            <i className="bx bx-package checkout__icon-big"></i>
            <span>Thanh toán khi nhận hàng</span>
          </Button>
        </div>
        <div className="checkout__part-info">
          <Form.Item>
          <Button className="button" htmlType="submit" loading={loading} style={{fontFamily:"sans-serif",width:"100%"}}>
            Đặt hàng
          </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default Payment;
