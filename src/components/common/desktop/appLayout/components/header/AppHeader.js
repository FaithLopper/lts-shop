import React from "react";
import HotNew from "./HotNew";
import Menu from './Menu'
import Nav from "./Nav";
const AppHeader = (props) => {
  const {NavigatorMenu,userData,onLogout,cartProduct,closeModalCart,modalStatus,cartListData}=props
  return (
    <header className="header">
      <div className="header__container">
        <Menu NavigatorMenu={NavigatorMenu} userData={userData} onLogout={onLogout}/>
        <Nav cartProduct={cartProduct} closeModalCart={closeModalCart} cartListData={cartListData} modalStatus={modalStatus}/>
        {/* <HotNew/>  */}
      </div>
    </header>
  );
};

export default AppHeader;
