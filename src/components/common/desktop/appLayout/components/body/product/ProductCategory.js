import React from "react";
import ProductItem from "./ProductItem";

const ProductCategory = ({ ...props }) => {
  const { data } = props;
  console.log(data)
  return (
    <div className="product__category">
      <div
        className="category__img"
        style={{
          width: "89.5rem",
          height: "30rem",
          backgroundImage: `url(${data?.categoryImage})`,
        }}
      >
        <div className="category__title">{data?.categoryName}</div>
      </div>
      <div className="product_grid_container">
        {/* {data?.items.map((ite, index) => (
          <ProductItem key={index} data={ite} />
        ))} */}
      </div>
    </div>
  );
};

export default ProductCategory;
