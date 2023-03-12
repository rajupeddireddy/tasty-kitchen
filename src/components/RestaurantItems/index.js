import { BiRupee } from "react-icons/bi";
import "./index.css";

const RestaurantItems = (props) => {
  const { productDetails } = props;
  const { name, imageUrl, rating, cost, id } = productDetails;

  return (
    <li className="restaurant-item">
      <img
        src={imageUrl}
        className="restaurant-item-image"
        alt={`restaurant item `}
      />
      <div className="restaurent-menu-container">
        <p className="restaurant-item-title">{name}</p>
        <div className="rupee-icon-cost-container">
          <BiRupee className="rupee-icon" />
          <p className="restaurant-item-brand">{cost}</p>
        </div>
        <div className="restaurant-item-price-rating-container">
          <div className="restaurant-item-rating-container">
            <img
              src="https://res.cloudinary.com/dh4d9iuty/image/upload/v1633148899/star_image_ynmj3g.png"
              alt="star"
              className="restaurant-item-star"
            />
            <p className="restaurant-item-rating">{rating}</p>
          </div>
        </div>
        <button type="button" className="add-button">
          ADD
        </button>
      </div>
    </li>
  );
};

export default RestaurantItems;
