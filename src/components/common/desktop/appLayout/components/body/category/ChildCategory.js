import React, { useEffect, useState } from "react";
import { getProduct } from "../../../../../../../actions/product";
import { useDispatch, useSelector } from "react-redux";
import Product from "../product/Product";
import CategoryBanner from "./CategoryBanner";
import { AppConstants } from "../../../../../../../constants";
import { actions } from "../../../../../../../actions";

const ChildCategory = (props) => {
  const { data } = props;
  const { id, name, icon, note } = data;

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
    <section className="product section" id="product">
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
    </section>
  );
};

export default ChildCategory;
