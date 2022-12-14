import React from "react";
import HotNew from "./HotNew";
import Menu from './Menu'
import Nav from "./Nav";
const AppHeader = (props) => {
  const {NavigatorMenu}=props
  return (
    <header className="header">
      <div className="header__container">
        <Menu NavigatorMenu={NavigatorMenu}/>
        <Nav/>
        {/* <HotNew/>  */}
      </div>
    </header>
  );
};

export default AppHeader;
