import { Link } from "react-router-dom";
import "./index.css";

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dh4d9iuty/image/upload/v1632989083/not_found_s8ib21.png"
      alt="not found"
      className="not-found-img"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-description">
      we are sorry, the page you requested could not be found Please go back to
      the homepage
    </p>

    <Link to="/">
      <button type="button" className="shop-now-btn">
        Home Page
      </button>
    </Link>
  </div>
);

export default NotFound;
