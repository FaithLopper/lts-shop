import React from "react";
import ParentCategory from "./ParentCategory";

const Category = (props) => {
  const { data } = props;

  return (
    <section className="product" id="product">
      <div className="product__container container">
        {data.map((p, index) => (
          <ParentCategory data={p} key={"ParentCategory" + index} />
        ))}
      </div>
    </section>
  );
};

export default Category;
