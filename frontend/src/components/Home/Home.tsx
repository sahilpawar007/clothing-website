import About from "../Layout/About/About";
import CarouselSlide from "../Layout/Carousel/Carousel";
import NewProducts from "./NewProducts";
import Product from "./Product";
import Promo from "./Promo";

const Home = () => {
  return (
    <div className="container w-full bg-white">
      <CarouselSlide />
      <Product />
      <Promo />
      <NewProducts />
      <About />
    </div>
  );
};

export default Home;
