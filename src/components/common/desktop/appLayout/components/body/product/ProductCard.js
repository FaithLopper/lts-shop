import React, { useCallback } from "react";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  const { id, img, isSold, name, price } = props;
  const DropDownProductChild = useCallback(
    (event) => {
      //remove border for the old choose product card (if have)
      const pickedProduct = document.getElementsByClassName("on-product-pick");
      if (pickedProduct) {
        const pickedProductArray = [...pickedProduct];
        pickedProductArray[0]?.classList.remove("on-product-pick");
      }

      //add border for the choose product card
      const childCardById = document.getElementById(`product-${id}-card`);
      childCardById.classList.add("on-product-pick");

      //hide old showed child product container
      const allChildDropDown = document.getElementsByClassName(
        "product-child-dropdown"
      );
      const allChildDropDownArray = [...allChildDropDown];
      allChildDropDownArray.forEach((element) => {
        if (element.style.display !== "none") element.style.display = "none";
      });

      //show child product of the choose product card
      const childDropDownById = document.getElementById(`product-${id}-child`);
      if (childDropDownById?.style.display === "none") {
        childDropDownById.style.display = "block";
      }
    },
    [id]
  );
  return (
    <div
      onClick={(e) => DropDownProductChild(e)}
      id={`product-${id}-card`}
      className="product-card"
    >
      <div className="img-container">
        <img src={img} className="product-img-size" alt="prod-img" />
        {isSold && <div>SOLD OUT</div>}
      </div>
      <Link to={`/product-detail/${id}`}>
        <div className="product-info">
          <div className="product-name">{name}</div>
          <div className="product-price">{price}</div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
