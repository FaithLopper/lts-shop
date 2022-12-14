import { QuestionCircleFilled } from "@ant-design/icons";
import { Button, Form } from "antd";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Utils from "../../../../../../../utils";
import Billing from "./Billing";
import Delivery from "./Delivery";
import Payment from "./Payment";
import Shipping from "./Shipping";


const data = [
  {
    image:
      "https://secure-images.nike.com/is/image/DotCom/DH0956_001?v=a0a21517955e78b0844bdf3dfdde8b87",
    name: `Nike Air Force 1 '07 LV8`,
    productCategory: `Men's Shoes`,
    description: "Malachite/Sail/White/Blue Jay",
    variants: { size: 40, quantity: 1 },
    price: 3239000,
    totalPrice: 3239000,
    quantity: 1,
  },
  {
    image:
      "https://secure-images.nike.com/is/image/DotCom/DJ9946_100?v=a0a21517955e78b0844bdf3dfdde8b87",
    name: `Nike Air Max Flyknit Racer`,
    productCategory: `Men's Shoes`,
    description: "Malachite/Sail/White/Blue Jay",
    variants: { size: 40, quantity: 1 },
    price: 1239000,
    totalPrice: 1239000,
    quantity: 1,
  },
  {
    image:
      "	https://secure-images.nike.com/is/image/DotCom/DO9387_001?v=a0a21517955e78b0844bdf3dfdde8b87",
    name: `Nike Air Force 1 '07 LV8`,
    productCategory: `Men's Shoes`,
    description: "Malachite/Sail/White/Blue Jay",
    variants: { size: 40, quantity: 1 },
    price: 2699000,
    totalPrice: 2699000,
    quantity: 1,
  },
  {
    image:
      "	https://secure-images.nike.com/is/image/DotCom/DO9387_001?v=a0a21517955e78b0844bdf3dfdde8b87",
    name: `Nike Court Borough Low 2`,
    productCategory: `Men's Shoes`,
    description: "Malachite/Sail/White/Blue Jay",
    variants: { size: 40, quantity: 1 },
    price: 4239000,
    totalPrice: 4239000,
    quantity: 1,
  },
  {
    image:
      "	https://secure-images.nike.com/is/image/DotCom/DO9387_001?v=a0a21517955e78b0844bdf3dfdde8b87",
    name: `Nike Air Force 1 '07 LV8`,
    productCategory: `Men's Shoes`,
    description: "Malachite/Sail/White/Blue Jay",
    variants: { size: 40, quantity: 1 },
    price: 2699000,
    totalPrice: 2699000,
    quantity: 1,
  },
  {
    image:
      "	https://secure-images.nike.com/is/image/DotCom/DO9387_001?v=a0a21517955e78b0844bdf3dfdde8b87",
    name: `Nike Court Borough Low 2`,
    productCategory: `Men's Shoes`,
    description: "Malachite/Sail/White/Blue Jay",
    variants: { size: 40, quantity: 1 },
    price: 4239000,
    totalPrice: 4239000,
    quantity: 1,
  },
];

const shippingOption = [
  {
    arrives: "Dự kiến giao Tue, Nov 8 - Tue, Nov 15",
    shippCost: 250000,
    shippType: "Shipment One",
  },
  {
    arrives: "Dự kiến giao Tue, Nov 8 - Tue, Nov 30",
    shippCost: 150000,
    shippType: "Shipment One",
  },
];

const CheckoutForm = ({ orderSection,getLocation,createOrder,history }) => {
  const deliveryRef = useRef();
  const shippingRef = useRef();
  const billingRef = useRef();

  const [avaible,setAvaible]= useState(false)
  const [active, setActive] = useState({
    delivery: { active: true, isEdited: false },
    shipping: { active: false, isEdited: false },
    // billing: { active: false, isEdited: false },
    payment: { active: false, isEdited: false },
  });

  const [form, setForm] = useState({
    delivery: {},
    shipping: {},
    billing: {},
    payment: {},
  });
  const { delivery, shipping, billing, payment } = form;
  const [product, setProduct] = useState(data);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (form.billing.delivery) {
      setForm({
        ...form,
        billing: form.delivery,
      });
    } else
      setForm({
        ...form,
        billing: form.billing,
      });
  }, [form.billing]);

  useEffect(() => {
    if(Object.keys(orderSection).length !==0 )
      setAvaible(true)
    else{
      setTimeout(()=>{
        window.location.href ='/cart'
      },5000)
    }
  }, []);
  const onNext = (current) => {
    switch (current) {
      case 0:
        setActive({
          ...active,
          delivery: { isEdited: true, active: false },
          payment: { ...active.payment, active: true },
          // shipping: { ...active.shipping, active: true },
        });

        break;
      case 1:
        setActive({
          ...active,
          shipping: { isEdited: true, active: false },
          // billing: { ...active.billing, active: true },
          payment: { ...active.payment, active: true },
        });
        break;
      case 2:
        setActive({
          ...active,
          billing: { isEdited: true, active: false },
          payment: { ...active.payment, active: true },
        });
        break;
      default:
        break;
    }
  };

  const setFormData = (data, type) => {
    switch (type) {
      case 0:
        setForm({
          ...form,
          delivery: data,
        });
        break;
      case 1:
        setForm({
          ...form,
          shipping: data,
        });
        break;
      case 2:
        setForm({
          ...form,
          billing: data,
        });
        break;
      default:
        break;
    }
  };

  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  const handleSubmit =(formValues) =>{
    setLoading(true)
    createOrder({
      params:{
        ...delivery,
        ...payment,
        ...formValues,
        ...orderSection,
        paymentMethod:3,
      },
      onCompleted:(responseData)=>{
        if(responseData.result){
          const {id,status}= responseData.data
          setLoading(false)
          history.push(`/summary?id=${id}&status=${status}&total=${orderSection.price}`)
        }
      },
      onError:()=>{
        setLoading(false)
      }
    })
  }
  const onEdit = (current) => {
    switch (current) {
      case 0:
        setActive({
          delivery: { active: true, isEdited: false },
          shipping: { ...active.shipping, active: false },
          billing: { ...active.billing, active: false },
          payment: { ...active.payment, active: false },
        });

        break;
      case 1:
        setActive({
          shipping: { active: true, isEdited: false },
          delivery: { ...active.delivery, active: false },
          billing: { ...active.billing, active: false },
          payment: { ...active.payment, active: false },
        });
        break;
      case 2:
        setActive({
          billing: { active: true, isEdited: false },
          delivery: { ...active.delivery, active: false },
          shipping: { ...active.shipping, active: false },
          payment: { ...active.payment, active: false },
        });
        break;
      default:
        break;
    }
    scrollTop();
  };
  return (
    <section className="checkout section">
      <div className="checkout__container page-wrapper grid">
        <div className="checkout__part">
          <div className="checkout__content">
            {
              avaible ? <>
              {active.delivery.active && (
              <Delivery
                formRef={deliveryRef}
                onNext={onNext}
                setFormData={setFormData}
                scrollTop={scrollTop}
                getLocation={getLocation}
              />
            )}
            {/* {active.shipping.active && (
              <Shipping
                product={product}
                formRef={shippingRef}
                setFormData={setFormData}
                onNext={onNext}
                shippingOption={shippingOption}
                scrollTop={scrollTop}
              />
            )} */}
            {/* {active.billing.active && (
              <Billing
                formRefa={billingRef}
                onNext={onNext}
                setFormData={setFormData}
                scrollTop={scrollTop}
              />
            )} */}

            {active.payment.active && (
              <Payment
                formRefa={billingRef}
                onNext={onNext}
                setFormData={setFormData}
                scrollTop={scrollTop}
                handleSubmit={handleSubmit}
                loading={loading}
              />
            )}
              </>:<>Phiên thanh toán đã hết hạn, tự động quay trở lại trang giỏ hàng trong 5s</>
            }
          </div>
          <div className="checkout__process">
            {avaible ? <>
            <div className="checkout__process-item">
              <div className="checkout__process-header">
                <div
                  className={
                    active.delivery.active
                      ? "content__title active-title"
                      : "content__title"
                  }
                >
                  Vận chuyển
                </div>
                {active.delivery.isEdited ? (
                  <Button
                    className="process__button round-button-white"
                    onClick={() => onEdit(0)}
                  >
                    Sửa
                  </Button>
                ) : (
                  <></>
                )}
              </div>
              {active.delivery.isEdited ? (
                <div
                  className={
                    active.delivery.active
                      ? "checkout__process-body active-title"
                      : "checkout__process-body"
                  }
                >
                  <span>
                    {delivery.firstName} {delivery.lastName}
                  </span>
                  <span>{delivery.addressDetails}</span>
                  <span>{delivery.receiverName}</span>
                  <span>{delivery.receiverPhone}</span>
                </div>
              ) : (
                <></>
              )}
            </div>
            {/* 
            <div className="checkout__process-item">
              <div className="checkout__process-header">
                <div
                  className={
                    active.shipping.active
                      ? "content__title active-title"
                      : "content__title"
                  }
                >
                  Giao hàng
                </div>
                {active.shipping.isEdited ? (
                  <Button
                    className="process__button round-button-white"
                    onClick={() => onEdit(1)}
                  >
                    Sửa
                  </Button>
                ) : (
                  <></>
                )}
              </div>
              {active.shipping.isEdited ? (
                <div
                  className={
                    active.delivery.active
                      ? "checkout__process-body active-title"
                      : "checkout__process-body"
                  }
                >
                  <span>{Utils.formatMoney(shipping.shippCost) || 0}</span>
                  <span>{shipping.shippType}</span>
                  <span>{shipping.arrives}</span>
                </div>
              ) : (
                <></>
              )}
            </div> */}

            {/* <div className="checkout__process-item">
              <div className="checkout__process-header">
                <div
                  className={
                    active.billing.active
                      ? "content__title active-title"
                      : "content__title"
                  }
                >
                  Hoá đơn
                </div>
                {active.billing.isEdited ? (
                  <Button className="process__button round-button-white">
                    Sửa
                  </Button>
                ) : (
                  <></>
                )}
              </div>
              {active.billing.isEdited ? (
                <div
                  className={
                    active.delivery.active
                      ? "checkout__process-body active-title"
                      : "checkout__process-body"
                  }
                >
                  <span>
                    {delivery.firstName} {delivery.lastName}
                  </span>
                  <span>{delivery.address1}</span>
                  <span>{delivery.phone}</span>
                </div>
              ) : (
                <></>
              )}
            </div> */}

            <div className="checkout__process-item">
              <div className="checkout__process-header">
                <div
                  className={
                    active.payment.active
                      ? "content__title active-title"
                      : "content__title"
                  }
                >
                  Thanh toán
                </div>
                {active.payment.isEdited ? (
                  <Button className="process__button round-button-white">
                    Sửa
                  </Button>
                ) : (
                  <></>
                )}
              </div>
              {active.payment.isEdited ? (
                <div
                  className={
                    active.delivery.active
                      ? "checkout__process-body active-title"
                      : "checkout__process-body"
                  }
                >
                  <span>{payment.type}</span>
                </div>
              ) : (
                <></>
              )}
            </div>
            </>:<></>}
          </div>
        </div>
        <div className="checkout__summary">
          <div className="content__title">Tóm tắt đơn hàng</div>
          <div className="checkout__summary-content">
            <div className="checkout__summary-item grid">
              <div className="summary__name" onClick={() => onNext(0)}>
                Giá trị
                <QuestionCircleFilled
                  className="summary__icon"
                  style={{ fontSize: "14px", cursor: "pointer" }}
                />
              </div>
              <div className="summary__price">
                {orderSection
                  ? orderSection.price
                    ? Utils.formatMoney(orderSection.price)
                    : 0
                  : 0}
              </div>
            </div>

            <div className="checkout__summary-item grid">
              <div className="summary__name">Chi phí vận chuyển</div>
              <div className="summary__price">Miễn phí</div>
            </div>
          </div>
          <div className="checkout__summary-content">
            <div className="checkout__summary-item grid">
              <div className="summary__name">Tổng </div>
              <div className="summary__price">
                {orderSection
                  ? orderSection.price
                    ? Utils.formatMoney(orderSection.price)
                    : 0
                  : 0}
              </div>
            </div>
          </div>
          {/* <div className="checkout__summary-preview">
            <div className="content__title">
              Dự kiến giao Tue, Nov 8 - Tue, Nov 15{" "}
            </div>
            <div className="checkout__summary-product">
              {product.map(({ image, name, quantity, variants, price }) => (
                <div className="summary__product grid">
                  <img src={image} alt="" className="summary-image" />
                  <div className="summary__item-info">
                    <div className="summary__item-name">{name}</div>
                    <div className="summary__item-quantity">Qty {quantity}</div>
                    <div className="summary__item-size">
                      Size EU {variants.size}
                    </div>
                    <div className="summary__item-name">
                      {" "}
                      {Utils.formatMoney(price) || 0}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default CheckoutForm;
