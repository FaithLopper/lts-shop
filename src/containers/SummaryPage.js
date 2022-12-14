import React, { useRef } from "react";
import MasterLayout from "../components/common/desktop/appLayout/MasterLayout";
import MobileMasterLayout from "../components/common/mobile/appLayout/MobileMasterLayout";
import Utils from "../utils";
import { useTranslation, withTranslation } from "react-i18next";
import LoginForm from "../components/common/desktop/appLayout/components/pages/Auth/LoginForm";
import { connect } from "react-redux";
import { useEffect } from "react";
import Summary from "../components/common/desktop/appLayout/components/pages/Summary/Summary";

const { isMobileDevice } = Utils;
const isMobile = isMobileDevice();

const SummaryPage = (props) => {
  const { t, title } = props;
  useEffect(() => {
    if (title) document.title = title;
  }, []);
  useEffect(() => {
    // Cập nhập document title sử dụng browser API
    const hotNew= document.querySelector(".hot-new")
    if(hotNew)
      hotNew.classList.add("remove-hotnew")
  });
  return !isMobile ? (
    <MasterLayout {...props} t={t} Component={Summary}/>
  ) : (
    <MobileMasterLayout {...props} t={t} Component={Summary}/>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation(['navigationBar','summaryPage'])(SummaryPage));
