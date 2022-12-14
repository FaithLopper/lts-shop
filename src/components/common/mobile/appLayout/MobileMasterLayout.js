import React, { Component } from "react";
import Utils from "../../../../utils";
import { connect } from "react-redux";
import AppBody from "./components/body/AppBody";
import AppFooter from "./components/footer/AppFooter";
import AppHeader from "./components/header/AppHeader";
import { withTranslation } from "react-i18next";

class MobileMasterLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetailModal: false,
      isNotEmail: false,
    };
    const {t}= props
    const NavigatorMenu = [
      {
        title: t("findStore"),
        refKey: "/store",
        // refValue: homeRef,
      },
      {
        title: t("help"),
        refKey: "/help",
        // refValue: functionRef,
      },
      {
        title: t("login"),
        refKey: "/login",
        // refValue: servicesRef,
      },
      {
        title: t("signIn"),
        refKey: "/register",
        // refValue: reviewRef,
      },
    ];
    
  const FooterMenu = {
    product: {
      title: "SẢN PHẨM",
      refKey: "product",
      items: [
        {
          title: "product1",
          refKey: "product1",
        },
        {
          title: "product2",
          refKey: "product1",
        },
        {
          title: "product3",
          refKey: "product1",
        },
      ],
    },
    about: {
      title: "VỀ CÔNG TY",
      refKey: "about",
      items: [
        {
          title: "Tuyển dụng",
          refKey: "about1",
        },
        {
          title: "Nhượng quyền",
          refKey: "about1",
        },
        {
          title: "Về chúng tôi",
          refKey: "about1",
        },
      ],
    },
    support: {
      title: "HỖ TRỢ",
      refKey: "support",
      items: [
        {
          title: "FAQs",
          refKey: "about1",
        },
        {
          title: "Bảo mật thông tin",
          refKey: "about1",
        },
        {
          title: "Chính sách chung",
          refKey: "about1",
        },
        {
          title: "Tra cứu đơn hàng",
          refKey: "about1",
        },
      ],
    },
    contact: {
      title: "LIÊN HỆ",
      refKey: "contact",
      items: [
        {
          title: "Email góp ý",
          refKey: "about1",
        },
        {
          title: "Hotline",
          refKey: "about1",
        },
        {
          title: "0364 521 323",
          refKey: "about1",
        },
      ],
    },
  };
    this.NavigatorMenu= NavigatorMenu
    this.FooterMenu= FooterMenu
    // this.setShowDetailModal = this.setShowDetailModal.bind(this);
  }
  
  render() {
    const { configPageData, clientListData,Component } = this.props;
    return (
      <>
        <div
          className="master-layout mobile-screen"
          id="home"
          // ref={Utils.findRefByKey("home", NavigatorMenu)}
        >
          <AppHeader
          NavigatorMenu={this.NavigatorMenu}
          // configPageData={configPageData}
          // setShowDetailModal={this.setShowDetailModal}
          />
          <AppBody
            // configPageData={configPageData}
            // clientListData={clientListData}
            // NavigatorMenu={NavigatorMenu}
            // setShowDetailModal={this.setShowDetailModal}
            Component={Component}
          />
          <AppFooter
            FooterMenu={this.FooterMenu}
            // configPageData={configPageData}
            // setShowDetailModal={this.setShowDetailModal}
            // showDetailModal={this.state.showDetailModal}
            // isNotEmail={this.state.isNotEmail}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MobileMasterLayout);
