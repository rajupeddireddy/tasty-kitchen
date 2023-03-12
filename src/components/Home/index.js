import Cookies from "js-cookie";
import { Redirect, Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import AllRestaurantsSection from "../AllRestaurantsSection";

import "./index.css";

const Home = () => {
  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Header />

      <div className="home-container">
        <div className="banner-container">
          <img
            src="https://res.cloudinary.com/dh4d9iuty/image/upload/v1633070876/banner_image_zojcf8.png"
            alt="clothes that get you noticed"
            className="home-desktop-img"
          />
        </div>
      </div>
      <div className="item-sections">
        <AllRestaurantsSection />
      </div>
      <Footer />
    </>
  );
};

export default Home;
