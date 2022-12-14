import React from "react";
import addToCardLogo from "../../../../../../../assets/images/icon/add-to-card.png";

const ProductItem = ({ ...props }) => {
  const { data } = props;
  return (
    <div className="product_card">
      <a href="/product-1">
        <div className="image_container">
          <img
            alt="product-img"
            src={data?.productImage}
          />
        </div>
        <div className="product_card_info">
          <div>
            <span>{data?.productName}</span>
            <h4>{data?.productAttributes}</h4>
            <h5>{data?.price}</h5>
          </div>
          <button className="button-35">
            <div className="add_cart">
              <img alt="add-cart-img" width={32} src={addToCardLogo} />
            </div>
          </button>
        </div>
      </a>
    </div>
  );
};

export default ProductItem;
