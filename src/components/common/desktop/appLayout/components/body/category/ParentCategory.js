import React, { useEffect, useState } from "react";
import ChildCategory from "../category/ChildCategory";
import { useDispatch, useSelector } from "react-redux";
import Product from "../product/Product";
import { AppConstants } from "../../../../../../../constants";
import CategoryBanner from "./CategoryBanner";
import { withTranslation } from "react-i18next";
import { actions } from "../../../../../../../actions";

const ParentCategory = (props) => {
  const { data } = props;
  const { id, childCategories, name, icon, note } = data;

  const stateProductList = useSelector((state) => state.product);
  const { productList } = stateProductList;
  const productDataList =
    productList.find((pr) => pr.categoryId === id)?.data || [];

  useEffect(() => {
    const checkExistProduct = productList.some((pr) => pr.categoryId === id);
    if (!checkExistProduct) getProductList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();
  const getProductList = () => {
    const params = {
      categoryId: id,
    };
    dispatch(actions.getProductList({ params }));
  };

  return (
    <section className="product cate-bg" id="product">
      <CategoryBanner
        img={`${AppConstants.contentRootUrl}/` + icon || ""}
        name={name || ""}
        note={note || ""}
      />
      {productDataList.length !== 0 && (
        <div className="product__container container product-section">
          <Product data={productDataList} />
        </div>
      )}
      {childCategories && (
        <div className="product__container container child-category">
          {childCategories.map((p, index) => (
            <ChildCategory data={p} key={"childCategories" + index} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ParentCategory;
