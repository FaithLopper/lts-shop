import React from "react";
import Slider from "react-slick";
const Banner = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  const banners = [
    {
      image:
        "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1824,c_limit/20d72001-2965-493d-ac83-21f83ce47721/nike-just-do-it.jpg",
      redirect: "",
    },
    {
      image:
        "https://ananas.vn/wp-content/uploads/LowHigh_Desktop-1920x1050.jpg",
      redirect: "",
    },
    {
      image:
        "https://ananas.vn/wp-content/uploads/Flannel_1920x1050_desktop.jpeg",
      redirect: "",
    },
    {
      image:
        "https://ananas.vn/wp-content/uploads/Hi-im-Mule_1920x1050-Desktop.jpg",
      redirect: "",
    },
  ];
  return (
    <div className="home__banner">
      <Slider {...settings}>
        {banners ? (
          banners.map(({ image, redirect }) => {
            return (
              <div className="banner__wrapper">
                <a href={redirect} className="hotnew__redirect">
                  <div
                    className="banner__image"
                    style={{ backgroundImage: `url(${image})` }}
                  ></div>
                </a>
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

export default Banner;
