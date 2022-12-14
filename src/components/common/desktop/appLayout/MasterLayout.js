import React, { Component } from "react";
import Utils from "../../../../utils";
import { connect } from "react-redux";
import AppBody from "./components/body/AppBody";
import AppFooter from "./components/footer/AppFooter";
import AppHeader from "./components/header/AppHeader";
import { withTranslation } from "react-i18next";
import { actions } from "../../../../actions";
import { StorageKeys } from "../../../../constants";
import apiConfig from "../../../../constants/apiConfig";
import NewHeader from "./components/header/NewHeader";
const { getUserData } = actions;
class MasterLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: getUserData(),
      showDetailModal: false,
      isNotEmail: false,
    };
    const { t } = props;
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
    this.NavigatorMenu = NavigatorMenu;
    // this.setShowDetailModal = this.setShowDetailModal.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    this.checkPermission();
  }

  onLogout() {
    const { logout } = this.props;
    logout();
    if (
      window.localStorage &&
      window.localStorage.getItem(StorageKeys.userData)
    )
      window.localStorage.removeItem(StorageKeys.userData);
    window.location.href = "/login";
  }

  checkPermission() {
    const { auth, history, location } = this.props;
    if (auth) {
      if (!this.state.userData) {
        if (location.pathname !== "/register") history.push("/login");
      }
    }
  }

  render() {
    const { userData } = this.state;
    const { configPageData, clientListData, Component,dataConfig } = this.props;
    return (
      <>
        <div
          className="master-layout desktop-screen"
          id="home"
          // ref={Utils.findRefByKey("home", NavigatorMenu)}
        >
          {this.props.match.path !== "/news/:id" ? (
            <AppHeader
              NavigatorMenu={this.NavigatorMenu}
              userData={userData}
              onLogout={this.onLogout}
              cartProduct={this.props.cartProduct}
              closeModalCart={this.props.closeModalCart}
              modalStatus={this.props.modalStatus}
              cartListData={this.props.cartListData}
            />
          ) : (
            <NewHeader dataConfig={dataConfig || {}}/>
          )}

          <AppBody Component={Component} {...this.props} />
          <AppFooter />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  cartProduct:state.cart?.cartProduct,
  cartListData:state.cart?.cartListData,
  modalStatus:state.cart?.modalStatus,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(actions.logout()),
  closeModalCart: () => dispatch(actions.closeModalCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MasterLayout);
