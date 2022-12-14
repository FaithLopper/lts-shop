import React, { useRef } from "react";
import MasterLayout from "../components/common/desktop/appLayout/MasterLayout";
import MobileMasterLayout from "../components/common/mobile/appLayout/MobileMasterLayout";
import Utils from "../utils";
import { useTranslation, withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { useEffect } from "react";
import Cart from "../components/common/desktop/appLayout/components/pages/Cart/Cart";
import { actions } from "../actions";
import Index from "../components/common/desktop/appLayout/components/pages/Profile/Index";

const { isMobileDevice } = Utils;
const isMobile = isMobileDevice();

const ProfileSettingPage = (props) => {
  const { t, title } = props;
  useEffect(() => {
    if (title) document.title = title;
  }, []);
  useEffect(() => {
    const hotNew= document.querySelector(".hot-new")
    if(hotNew)
      hotNew.classList.add("remove-hotnew")
  });
  return !isMobile ? (
    <MasterLayout {...props} t={t} Component={Index} />
  ) : (
    <MobileMasterLayout {...props} t={t} Component={Index}/>
  );
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation(['navigationBar','profileSettingPage'])(ProfileSettingPage));
