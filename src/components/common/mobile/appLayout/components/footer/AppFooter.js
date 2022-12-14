import React from "react";
import storeLogo from "../../../../../../assets/svg/store.svg";
import InstaLogo from "../../../../../../assets/svg/icon_instagram.svg";
import FbLogo from "../../../../../../assets/svg/icon_facebook.svg";
import YtLogo from "../../../../../../assets/svg/icon_youtube.svg";
import ArrowRight from "../../../../../../assets/images/icon/arrow_right.jpg";
import StoreLogo from "../../../../../../assets/svg/logo-2000.svg";
import FooterListItemsBox from "./footerListItemsBox";

const AppFooter = (props) => {
  const { FooterMenu } = props;
  const { contact, about, support, product } = FooterMenu;

  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="container">
          <div className="findstore">
            <img src={storeLogo} alt="store-svg" />
            <button className="find-store-btn">FIND STORE</button>
          </div>
          <FooterListItemsBox item={product} />
          <FooterListItemsBox item={about} />
          <FooterListItemsBox item={support} />
          <FooterListItemsBox item={contact} />
          <div className="social px-10">
            <h4>ANANAS SOCIAL</h4>
            <div className="social-link">
              <a href="https://facebook.com">
                <img src={FbLogo} alt="fb-svg" />
              </a>
              <a href="https://instagram.com">
                <img src={InstaLogo} alt="insta-svg" />
              </a>
              <a href="https://youtube.com">
                <img src={YtLogo} alt="yt-svg" />
              </a>
            </div>
          </div>
          <div className="mail px-10">
            <h4>ĐĂNG KÝ NHẬN MAIL</h4>
            <div className="inputRecieveMail">
              <input type="email" id="inputRecieveMail" />
              <button>
                <img src={ArrowRight} alt="arrow-right" />
              </button>
            </div>
          </div>
          <div className="copyright px-10">
            <h5>Copyright © 2022 Long Term Shop. All rights reserved.</h5>
          </div>
          <div className="store-logo px-10">
            <a href="/">
              <img src={StoreLogo} width={200} alt="yt-svg" />
            </a>
          </div>
          {/* <div className="verify px-10">verify</div> */}
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
