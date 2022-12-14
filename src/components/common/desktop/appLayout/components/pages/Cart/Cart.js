import React from "react";
import { Button, Select } from "antd";
import {
  QuestionCircleFilled,
  WarningOutlined,
  WarningTwoTone,
} from "@ant-design/icons";
import Utils from "../../../../../../../utils";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { AppConstants } from "../../../../../../../constants";
const Cart = ({
  dataList,
  removeCart,
  changeQuantity,
  createOrderSection,
  history,
}) => {
  const [product, setProduct] = useState([]);
  const [isDelete, setDetele] = useState(null);
  const [productId, setProductId] = useState({});
  const [total, setTotal] = useState(() => {
    let total = 0;
    product.map((item) => {
      total = total + item.price;
    });
    return total;
  });
  const deleteProduct = (id, color, size) => {
    setProductId({ id, color, size });
    showCartModal(true);
  };

  const handleCheckout = () => {
    createOrderSection({
      params: { price: total },
      onCompleted: (sectionId) => {
        history.push(`/checkout?sectionId=${sectionId}`);
      },
      onError: () => {},
    });
  };

  useEffect(() => {
    if (dataList.length !== 0 && product.length === 0)
      setProduct(
        dataList.map((item) => {
          return { ...item, totalPrice: item.finalPrice * item.quantity };
        })
      );
  }, [dataList]);

  useEffect(() => {
    if (isDelete === true) {
      setProduct(
        product.filter((item, _index) => {
          if (_index !== productId.id) {
            return item;
          }
          return false;
        })
      );
      removeCart({
        params: {
          product: {
            id: productId.id,
            color: productId.color,
            size: productId.size,
          },
        },
        onCompleted: (data) => {
          console.log(data);
        },
        onError: (error) => {
          console.log(error);
        },
      });
      showCartModal(false);
    } else if (isDelete === false) {
      showCartModal(false);
    }
  }, isDelete);

  const showCartModal = (show) => {
    const cart = document.querySelector(".section__modal");
    if (show) cart.classList.add("active-modal-cart");
    else {
      cart.classList.remove("active-modal-cart");
      setDetele(null);
    }
  };

  useEffect(() => {
    setTotal(() => {
      let total = 0;
      product.map((item) => {
        total = total + item.finalPrice * item.quantity;
      });
      return total;
    });
  }, [product]);

  // useEffect(()=>{
  //   if()
  // },[product])

  const changeQuantityCart = (quantity, productId) => {
    setProduct(
      product.map((item, _index) => {
        if (_index === productId) {
          return {
            ...item,
            quantity: quantity,
            totalPrice: item.finalPrice * quantity,
          };
        }
        return item;
      })
    );
    changeQuantity({
      params: { product: { id: productId, quantity: quantity } },
    });
  };
  return (
    <section className="cart section">
      <div className="cart__container page-wrapper grid">
        <div className="cart__bag">
          <div className="content__title">Giỏ hàng</div>
          <div className="cart__list">
            {product.length !== 0 ? (
              product.map(
                (
                  {
                    image,
                    name,
                    size,
                    color,
                    // variants,
                    totalPrice,
                    // finalPrice,
                    quantity,
                  },
                  _index
                ) => {
                  // console.log(color,size)
                  return (
                    <>
                      <div className="cart__item grid">
                        <img
                          src={AppConstants.contentRootUrl + color?.image}
                          alt="color-img"
                          className="cart__item-image"
                        />
                        <div className="cart__item-info">
                          <div className="cart__item-name">{name}</div>
                          {/* <div className="cart__item-category">{color.name}</div> */}
                          <div className="cart__item-description">
                            {color?.name}
                          </div>
                          <div className="cart__item-variants">
                            <span className="cart__item-size">
                              Size {size.name}
                            </span>
                            <span className="cart__item-quantity">
                              Số lượng
                              <select
                                name="quantity"
                                className="cart__quantity-select"
                                onChange={(e) =>
                                  changeQuantityCart(e.target.value, _index)
                                }
                                value={quantity}
                              >
                                {[...Array(10)].map((item, _index) => (
                                  <option value={_index + 1}>
                                    {" "}
                                    {_index + 1}
                                  </option>
                                ))}
                              </select>
                            </span>
                          </div>
                          <div className="cart__item-action">
                            <i
                              className="fa fa-trash-o cart__icon"
                              aria-hidden="true"
                              onClick={() => deleteProduct(_index, color, size)}
                            ></i>
                          </div>
                        </div>
                        <div className="cart__item-price">
                          {Utils.formatMoney(totalPrice || 0)}
                        </div>
                      </div>
                    </>
                  );
                }
              )
            ) : (
              <>Không có sản phẩm nào trong giỏ hàng</>
            )}
          </div>
        </div>
        <div className="cart__summary">
          <div className="content__title">Tổng đơn hàng</div>
          <div className="cart__summary-content">
            <div className="cart__summary-item grid">
              <div className="summary__name">
                Giá trị
                <QuestionCircleFilled
                  style={{
                    fontSize: "14px",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                />
              </div>
              <div className="summary__price">
                {Utils.formatMoney(total || 0)}
              </div>
            </div>

            <div className="cart__summary-item grid">
              <div className="summary__name">Chi phí vận chuyển</div>
              <div className="summary__price">Miễn phí</div>
            </div>
          </div>
          <div className="cart__summary-content">
            <div className="cart__summary-item grid">
              <div className="summary__name">Tổng</div>
              <div className="summary__price">
                {Utils.formatMoney(total || 0)}
              </div>
            </div>
          </div>
          <div className="cart__summary-button">
            <Button
              className="round-button"
              onClick={handleCheckout}
              style={{ lineHeight: "1px", padding: "30px 0" }}
            >
              Thanh toán
            </Button>
          </div>
        </div>
      </div>
      <div className="section__modal">
        <div className="modal__content">
          <div className="modal__header">
            <WarningTwoTone
              className="modal__icon"
              twoToneColor="rgb(251, 194, 25)"
            />
            Thông báo
          </div>

          <div className="modal__body">Xoá sản phẩm khỏi giỏ hàng ?</div>
          <div className="modal__action">
            <Button className="round-button" onClick={() => setDetele(true)}>
              Xoá
            </Button>
            <Button
              className="round-button-white"
              onClick={() => setDetele(false)}
            >
              Huỷ
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
