import React, { useCallback, useEffect } from "react";
import ChildProduct from "./ChildProduct";
import { AppConstants } from "../../../../../../../constants";
import Utils from "../../../../../../../utils";
import ProductCard from "./ProductCard";

const ParentProduct = (props) => {
  const { data } = props;
  const { id, name, image, isSoldOut, price, childProducts } = data;

  const { formatMoney } = Utils;

  return (
    <section
      className="product product-child-container"
      style={{ width: "100%" }}
      id={`product-${id}`}
    >
      <ProductCard
        id={id}
        img={`${AppConstants.contentRootUrl}/` + image}
        name={name}
        price={formatMoney(price || 0)}
        isSold={isSoldOut}
      />
      {childProducts && (
        <div
          id={`product-${id}-child`}
          style={{ display: "none" }}
          className="product-child-dropdown"
        >
          <ul className="product_child_grid_container">
            {childProducts.map((p, index) => (
              <ChildProduct data={p} key={"ChildProduct" + index} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default ParentProduct;
