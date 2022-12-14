import React from "react";
import logo from "../../../../../../assets/images/LTS-black.png";
import moment from "moment";
import { Link } from "react-router-dom";
const NewHeader = (props) => {
  const { dataConfig } = props;
  let check = moment(dataConfig.createdDate);
  let day = check.format("DD"); // => ('Monday' , 'Tuesday' ----)
  let month = check.format("MMMM"); // => ('January','February.....)
  let year = check.format("YYYY"); // => ('2012','2013' ...)
  let date = `${month} ${day}, ${year}`;
  return (
    <header className="header new-page">
      <div className="new__header__container wrapper">
        <div className="new__header-top">
          <Link to="/">
            <img src={logo} alt="" className="new__header-logo" />
          </Link>
          <ul className="menu__list">
          <li className="menu__item">
              <Link Link to="/" className="menu__link">
                Trang chủ
              </Link>
            </li>
            <li className="menu__item">
              <Link Link to="/store" className="menu__link">
                Tìm kiếm cửa hàng
              </Link>
            </li>
            <li className="menu__item">
              <Link Link to="/help" className="menu__link">
                Trợ giúp
              </Link>
            </li>
          </ul>
        </div>
        <div className="new__header-content grid">
          <div className="news__header-description">{date}</div>
          <div className="news__header-title">{dataConfig.title}</div>
        </div>
      </div>
    </header>
  );
};

export default NewHeader;
