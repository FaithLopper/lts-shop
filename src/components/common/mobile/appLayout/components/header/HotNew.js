import React from "react";
import Slider from "react-slick";

const HotNew = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    // autoplaySpeed: 2000,
  };
  const hotNew = [
    {
      title: "Freeship",
      description: "Áp dụng với tấp cả hoá đơn hơn 500.000 vnd",
      redirect: "",
    },
    {
      title: "Giảm giá 500k",
      description: "Áp dụng với tấp cả hoá đơn hơn 500.000 vnd",
      redirect: "",
    },
    {
      title: "Khuyến mãi",
      description: "Áp dụng với tấp cả hoá đơn hơn 500.000 vnd",
      redirect: "",
    },
    {
      title: "SALE OFF 50%",
      description: "Áp dụng với tấp cả hoá đơn hơn 500.000 vnd",
      redirect: "",
    },
  ];
  return (
    <div className="hot-new wrapper">
        <Slider {...settings}>
          {hotNew ? (
            hotNew.map(({ title, description, redirect }) => {
              return (
                <div className="hotnew__content">
                  <div className="hotnew__title">{title}</div>
                  <div className="hotnew__description">{description}. 
                  <a href={redirect} className="hotnew__redirect"> Chi tiết</a>
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </Slider>
    </div>
  );
};

export default HotNew;
