import React from "react";
import ProductCategory from "./ProductCategory";
import ProductItem from "./ProductItem";
const Product = () => {
  return (
    <section className="product section" id="product">
      <h2 className="section__title">DANH MỤC MUA HÀNG</h2>
      <div className="product__container container">
        <ProductCategory />
        <ProductItem />
      </div>

      <div className="product__container container">
        <ProductCategory />
        <ProductItem />
      </div>
    </section>
  );
};

export default Product;
