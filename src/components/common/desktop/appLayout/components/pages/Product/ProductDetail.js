import React from "react";
import { Form, Spin, Radio, Button } from "antd";
import { AppConstants } from "../../../../../../../constants";
import Utils from "../../../../../../../utils";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
const ProductDetail = ({
  dataConfig: {
    image,
    id,
    description,
    name,
    price,
    isSoldOut,
    productConfigs,
  },
  loading,
  addCart,
  showModalCart,
}) => {
  const formRef = useRef();
  const [size, setSize] = useState([]);
  const [finalPrice, setPrice] = useState("");
  const [optionPrice, setOption] = useState({
    color: 0,
    size: 0,
  });
  const [color, setColor] = useState([]);
  const [showImage, setImage] = useState("");

  const [_size, _setSize] = useState({});
  const [_color, _setColor] = useState({});

  const handleSubmit = (formValue) => {
    const { color, size } = formValue;
    addCart({
      params: { product: { id, name, price, color, size, image, finalPrice,productConfigs } },
      onCompleted: (data) => {
        showModalCart({
          params: {
            product: { id, name, price, color, size, image, finalPrice },
          },
        });
      },
      onError: (error) => {},
    });
  };

  const onChange = (e) => {
    let productSelect = e.target.value;
    if (productSelect.price) {
      setOption({
        ...optionPrice,
        size: productSelect.price,
      });
    }
  };

  const onColorChange = (e) => {
    let productSelect = e.target.value;
      if (productSelect.image) {
        setImage(productSelect.image);
      }
      _setColor(productSelect);
      if (productSelect.price) {
        setOption({
          ...optionPrice,
          color: productSelect.price,
        });
      }
  };
  useEffect(() => {
    if (productConfigs) {
      if (productConfigs.length !== 0) {
        productConfigs.map((item) => {
          if (item.name === "size") {
            if (item.variants) setSize(item.variants);
          }
          if (item.name === "color") {
            if (item.variants) setColor(item.variants);
          }
        });
      }
    }
  }, [productConfigs]);

  useEffect(() => {
    if (image) {
      setImage(image);
    }
    if (price) setPrice(price);
  }, [image]);

  useEffect(() => {
    setPrice(price + optionPrice.color + optionPrice.size);
  }, [optionPrice]);
  return (
    <section className="product__detail section" id="product__detail">
      <div className="product__detail__container container grid">
        {loading ? (
          <div className="section__loading container">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <div className="product__left">
              <img
                src={AppConstants.contentRootUrl + showImage}
                alt="product-detail"
                className="product__image"
              />
            </div>
            <div className="product__right">
              <Form onFinish={handleSubmit} ref={formRef} id="form-product">
                <div className="product__name">{name}</div>
                <div className="product__price">
                  {finalPrice !== price
                    ? (
                        <>
                          <s>{Utils.formatMoney(price)}</s>{" "}
                          {Utils.formatMoney(finalPrice)}{" "}
                        </>
                      ) || 0
                    : Utils.formatMoney(price)}
                </div>
                <div className="product__variant">
                  {color.length !== 0 ? (
                    <Form.Item
                      name="color"
                      rules={[
                        {
                          required: true,
                          message: "Hãy chọn màu sắc !",
                        },
                      ]}
                    >
                      <Radio.Group
                        className="product__color-wrapper grid"
                        onChange={onColorChange}
                        value={_color}
                      >
                        {color.map((item) => (
                          <Radio value={item} key={item.name}>
                            <img
                              src={AppConstants.contentRootUrl + item.image}
                              alt="product"
                            />
                          </Radio>
                        ))}
                      </Radio.Group>
                    </Form.Item>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="product__variant">
                  <div className="product__variant-title">
                    <div>Chọn size</div>
                    <div className="size__table">Bảng size</div>
                  </div>
                  {size.length !== 0 ? (
                    <Form.Item
                      name="size"
                      rules={[
                        {
                          required: true,
                          message: "Hãy chọn kích cỡ !",
                        },
                      ]}
                    >
                      <Radio.Group
                        className="product__size-wrapper grid"
                        onChange={onChange}
                      >
                        {size.map((item) => (
                          <Radio.Button value={item}>{item.name}</Radio.Button>
                        ))}
                      </Radio.Group>
                    </Form.Item>
                  ) : (
                    <></>
                  )}
                  <Button
                    form="form-product"
                    htmlType="submit"
                    className="round-button"
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </div>
                <div className="product__description">{description}</div>
              </Form>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductDetail;
