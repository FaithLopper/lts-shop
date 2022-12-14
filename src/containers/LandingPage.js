import React, { useEffect, useRef, useState } from "react";
import MasterLayout from "../components/common/desktop/appLayout/MasterLayout";
import MobileMasterLayout from "../components/common/mobile/appLayout/MobileMasterLayout";
import Utils from "../utils";
import { useTranslation, withTranslation } from "react-i18next";
import { connect, useDispatch, useSelector } from "react-redux";
import New from "../components/common/desktop/appLayout/components/body/new/New";
import Home from "../components/common/desktop/appLayout/components/body/home/Home";

import ProductMobile from "../components/common/mobile/appLayout/components/body/product/Product";
import NewMobile from "../components/common/mobile/appLayout/components/body/new/New";
import HomeMobile from "../components/common/mobile/appLayout/components/body/home/Home";
import Category from "../components/common/desktop/appLayout/components/body/category/Category";
import { actions } from "../actions";
const { isMobileDevice } = Utils;
const isMobile = isMobileDevice();

var pagination = {
  pageSize: 6,
  totalPage: 1,
  current: 1,
  totalElements: null,
};

const LandingPage = (props) => {
  const { t, title } = props;
  const dispatch = useDispatch();

  const stateNews = useSelector((state) => state.news);
  const { newsListData } = stateNews;

  const newData = newsListData?.data || [];
  pagination.totalPage = newsListData?.totalPage || 1;
  pagination.totalElements = newsListData?.totalElements || 1;
  // const newLoading = newsListLoading || false;

  const getNewList = (currentPage) => {
    const page = currentPage ? currentPage - 1 : 0;
    const params = {
      page,
      size: pagination.pageSize,
      kind: 1,
    };
    dispatch(actions.getNewsList({ params }));
  };

  const handleTableChange = (page, pageSize) => {
    const params = {
      page:page-1,
      size: pagination.pageSize,
      kind: 1,
    };
    dispatch(actions.getNewsList({ params }));
    pagination.current = page;
  };

  const getProductCategory = () => {
    dispatch(actions.getCategoryList());
  };

  const stateCategory = useSelector((state) => state.category);
  const { getCategoryListLoading, categoryList } = stateCategory;
  const categoryData = categoryList || [];
  const categoryLoading = getCategoryListLoading || false;
  
  useEffect(() => {
    getNewList();
    getProductCategory();
    // props.getCategoryAutoComplete({ kind: 1 }); //kind = 1 = news
    if (title) document.title = title;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Component = () => (
    <>
      <Home />
      <Category data={categoryData} />
      <New
        newData={newData}
        pagination={pagination}
        handleTableChange={handleTableChange}
        loading={props.loading}
      />
    </>
  );

  const ComponentMobile = () => (
    <>
      <HomeMobile />
      <ProductMobile />
      {/* <NewMobile /> */}
    </>
  );

  return !isMobile ? (
    <MasterLayout
      {...props}
      t={t}
      Component={Component}
      // configPageData={_configPage}
    />
  ) : (
    <MobileMasterLayout
      {...props}
      // configPageData={_configPage}
      Component={ComponentMobile}
      t={t}
      // t={t}
      // mobileMasterLayoutRef={mobileMasterLayoutRef}
      // currentScrollY={_currentScrollY}
    />
  );
};

export default withTranslation("navigationBar")(LandingPage);
