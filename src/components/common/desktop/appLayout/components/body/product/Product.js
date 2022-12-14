import React, { useEffect, useState } from "react";
import ParentProduct from "./ParentProduct";

const Product = (props) => {
  const { data } = props;

  return (
    <section className="product section product__category" id="product">
      <h2 className="product-title">SẢN PHẨM</h2>
      {data && (
        <div className="product_grid_container">
          {data.map((p, index) => (
            <ParentProduct data={p} key={"ParentProduct" + index} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Product;
