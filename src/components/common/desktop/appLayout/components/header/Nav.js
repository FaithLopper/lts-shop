import React, { useEffect, useState } from "react";
import logo from "../../../../../../assets/svg/logo-500.svg";
import { CheckCircleFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { AppConstants } from "../../../../../../constants";

const Nav = ({cartProduct,closeModalCart,modalStatus,cartListData}) => {
  useEffect(()=>{
      window.addEventListener("scroll",function(){
        const nav= document.querySelector(".menu")
        if(this.scrollY >= 36) nav.classList.add("off-nav")
          else nav.classList.remove("off-nav")
    })
    },[])
  useEffect(()=>{
    if(Object.keys(cartProduct).length !==0){
      setProduct(cartProduct)
    }
  },[cartProduct])

  useEffect(()=>{
    if(modalStatus) showModal(true)
    else showModal(false)
  },[modalStatus])
  const tempData = {
    image:
      "https://secure-images.nike.com/is/image/DotCom/DQ7658_300?align=0,1&cropN=0,0,0,0&resMode=sharp&bgc=f5f5f5&wid=150&fmt=jpg",
    name: `Nike Air Force 1 '07 LV8`,
    size:{name:""},
    color:{name:"",image:""},
  };
  const [product,setProduct]=useState(tempData)
  const handleClose =()=>{
    closeModalCart()
  }
  const showModal =  (show)=>{
    const cart = document.querySelector(".cart__modal");
    if (show) cart.classList.add("active__modal-cart");
    else cart.classList.remove("active__modal-cart");
    setTimeout(()=>{
      closeModalCart()
    },8000)
  }
  return (
    <>
      <nav className="nav wrapper">
        <Link to="/">
          <img src={logo} alt="shop" className="nav__logo" />
        </Link>

        <ul className="nav__list grid">
          <li className="nav__item">Nam</li>
          <li className="nav__item">Nữ</li>
          <li className="nav__item">Giày</li>
          <li className="nav__item">Dép</li>
          <li className="nav__item">Sale</li>
          <li className="nav__item">Tin tức</li>
        </ul>

        <div className="nav__action">
          <div className="nav__search">
            <i className="uil uil-search nav__search-icon"></i>
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="nav__search-input"
            />
          </div>
          <Link to="/cart">
            <i className="bx bx-shopping-bag nav__icon" value={cartListData.length !== 0 ? cartListData.length : null}></i>
          </Link>
            {/* <i className="bx bx-shopping-bag nav__icon" onClick={()=>showModal(true)} value={3}></i> */}
        </div>
      </nav>

      <div className="cart__modal">
        <div className="card__modal-header">
          <span>
            <CheckCircleFilled style={{ color: "green" }} /> Đã thêm vào giỏ
            hàng
          </span>
          <i className="uil uil-multiply cart__modal-icon" onClick={()=>handleClose()}></i>
        </div>
        <div className="cart__product grid">
          <img src={AppConstants.contentRootUrl+product.color.image} alt="" className="cart__item-image" />
          <div className="cart__item-info">
            <div className="cart__item-name">{product.name}</div>
            <div className="cart__item-category">{product.color.name}</div>
            {/* <div className="cart__item-description">{product.description}</div> */}
            <div className="cart__item-variants">
              <span className="cart__item-size">
                Size {product.size.name}
              </span>
            </div>
          </div>
        </div>
        <div className="card__modal-action">
          <Link to="/cart" className="round-button">
            Giỏ hàng
          </Link>
          <Link to="/checkout" className="round-button">
            Thanh toán
          </Link>
        </div>
      </div>
    </>
  );
};

export default Nav;
