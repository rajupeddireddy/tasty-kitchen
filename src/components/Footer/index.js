import { AiOutlineTwitter, AiOutlineInstagram } from "react-icons/ai";
import { FaFacebookSquare, FaPinterestSquare } from "react-icons/fa";

import "./index.css";

const Footer = (props) => {
  return (
    <div className="footer-large-container">
      <div className="logo-container">
        <img
          className="white-logo"
          src="https://res.cloudinary.com/dh4d9iuty/image/upload/v1633076174/tasty_kitchen_white_logo_r8q3i5.png"
          alt="website logo"
        />
        <h1 className="footer-heading">Tasty Kitchen</h1>
      </div>
      <p className="footer-description">
        The only thing we are serious about is food.
      </p>

      <div className="social-media-container">
        <FaPinterestSquare className="social-icon" />
        <AiOutlineInstagram className="social-icon" />
        <AiOutlineTwitter className="social-icon" />
        <FaFacebookSquare className="social-icon" />
      </div>
    </div>
  );
};

export default Footer;
