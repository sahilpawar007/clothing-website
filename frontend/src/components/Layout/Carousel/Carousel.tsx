import image1 from "../../../images/nike.jpg";
import image2 from "../../../images/puma.jpg";
import image3 from "../../../images/gymshark.png";
import image4 from "../../../images/nike1.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Header/Header.css";
const CarouselSlide = () => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 700,
    autoplaySpeed: 10000,
    fade: true,
    cssEase: "linear",
  };
  return (
    <div>
      <Slider
        {...settings}
        className=" w-full h-full overflow-hidden z-10 mt-10 "
      >
        {[image1, image2, image3, image4].map((src, index) => (
          <div key={index} className="relative h-[600px] w-full">
            <img src={src} alt="slide" className="h-full w-full" />
            <button className="absolute text-2xl font-bold text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-60 border-4 rounded-none border-gray-200 w-60 h-20 hover:border-white hover:bg-opacity-40 px-4 py-2 ">
              Shop Now
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselSlide;
