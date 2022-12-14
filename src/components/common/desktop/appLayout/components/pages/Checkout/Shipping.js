import { Form, Input, Row, Col, Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Shipping = ({product,onNext,setFormData,formRef,shippingOption,scrollTop }) => {
  const handleSubmit= (formValue)=>{
      setFormData( {
        arrives: "Dự kiến giao Tue, Nov 8 - Tue, Nov 15",
        shippCost: 250000,
        shippType: "Shipment One",
      },1)
      onNext(1)
      scrollTop()
  }
  const {arrives,shippCost,shippType}= shippingOption
  return (
    <Form onFinish={handleSubmit} ref={formRef}>

    <div className="checkout__shipping">
      <div className="checkout__part-info">
        <div className="content__title">
          Khi nào bạn muốn nhận được đơn đặt hàng của mình?
        </div>
        <Button className="big-button round-button-white">
          <span className="big__button-title">Dự kiến giao Tue, Nov 8 - Tue, Nov 15 </span>
          <span className="big__button-value">250,000₫</span>
        </Button>

        <Button className="big-button round-button-white">
          <span className="big__button-title">Dự kiến giao Tue, Nov 7 - Tue, Nov 30 </span>
          <span className="big__button-value">150,000₫</span>
        </Button>
      </div>

      <div className="checkout__part-info">
        <div className="content__title_sub">
        Dự kiến giao Tue, Nov 8 - Tue, Nov 15 
        </div>
        <div className="checkout__shipping-product grid">
            {product.map(({image}) =>   <img src={image} alt="" className="shipping__image" />)}
        </div>
      </div>
      <div className="checkout__part-info">
        <button className="round-button" type="submit">Tiếp tục</button>
      </div>
    </div>
    </Form>
  );
};

export default Shipping;
