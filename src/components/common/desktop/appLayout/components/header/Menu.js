import React from "react";
import { Link } from "react-router-dom";

const Menu = (props) => {
  const { userData, onLogout } = props;
  return (
    <div className="menu wrapper">
      <div className="menu">
        <ul className="menu__list">
          <li className="menu__item">
            <Link to="/store" className="menu__link">
              Tìm kiếm cửa hàng
            </Link>
          </li>
          <span className="menu__line"></span>
          <li className="menu__item">
            <Link to="/help" className="menu__link">
              Trợ giúp
            </Link>
          </li>

          {userData ? (
            <>
              <span className="menu__line"></span>
              <li className="menu__item drop__down-hover ">
                <Link to="/profile" className="menu__link">
                  <span>Xin chào, {userData.username}</span>
                </Link>
                <ul className="user__dropdown">
                  <li className="user__option-header">Tài khoản</li>
                  <li className="user__option">
                    <Link to="/profile">Trang cá nhân</Link>
                  </li>
                  <li className="user__option">
                    <Link to="/cart">Giỏ hàng</Link>
                  </li>
                  <li className="user__option">
                    <span onClick={()=>{onLogout()}}>Đăng xuất</span>
                  </li>
                </ul>
              </li>
              <Link to="/profile">
                <i className="bx bx-user menu__icon-user"></i>
              </Link>
            </>
          ) : (
            <>
              <span className="menu__line"></span>
              <li className="menu__item">
              <Link to="/login" className="menu__link">
                Đăng nhập
              </Link>
              </li>
              <span className="menu__line"></span>
              <li className="menu__item">
              <Link to="/register" className="menu__link">
                Đăng kí
              </Link>
              </li>
            </>
          )}

          {/* <span className="menu__line"></span> */}
          {/* {NavigatorMenu &&
            NavigatorMenu.map(({ refKey, title }, index) => {
              return (
                <>
                  {
                    userData ?  <li className="menu__item">
                    <Link to='/profile' className="menu__link">
                      {userData.username}
                    </Link>
                  </li> :<></>
                  }
                  <li className="menu__item">
                    <Link to={refKey} className="menu__link">
                      {title}
                    </Link>
                  </li>
                  {index !== NavigatorMenu.length - 1 ? (
                    <span className="menu__line"></span>
                  ) : (
                    <></>
                  )}
                </>
              );
            })} */}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
