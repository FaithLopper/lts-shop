import React from "react";

const FooterListItemsBox = (props) => {
  const { item } = props;
  return (
    <div className={`${item?.refKey} px-10`}>
      <a href="/">
        <h4>{item?.title}</h4>
      </a>
      <ul>
        {item?.items.map((it, index) => (
          <li key={it.title + index} id={it.title + index}>
            <a href={it.href}>{it.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterListItemsBox;
