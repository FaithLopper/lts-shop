import React, { useEffect, useState } from "react";
import { AppConstants } from "../../../../../../../constants";
import Utils from "../../../../../../../utils";
import ProductCard from "./ProductCard";

const ChildProduct = (props) => {
  const { data } = props;
  const { id, name, image, isSoldOut, price } = data;

  const { formatMoney } = Utils;

  return (
    <section
      className="product product-child-container"
      style={{ width: "100%" }}
      id="product"
    >
      <ProductCard
        id={id}
        img={`${AppConstants.contentRootUrl}/` + image}
        name={name}
        price={formatMoney(price || 0)}
        isSold={isSoldOut}
      />
    </section>
  );
};

export default ChildProduct;
