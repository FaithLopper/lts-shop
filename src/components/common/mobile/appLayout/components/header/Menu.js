import React from "react";
import { Link } from "react-router-dom";

const Menu = (props) => {
  const { NavigatorMenu } = props;
  return (
    <div className="menu wrapper">
      <div className="menu">
        <ul className="menu__list grid">
          {NavigatorMenu &&
            NavigatorMenu.map(({ refKey, title }, index) => (
              <>
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
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
