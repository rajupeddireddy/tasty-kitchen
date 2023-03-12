import { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Loader from "react-loader-spinner";
//import { BsPlusSquare, BsDashSquare } from "react-icons/bs";

import CartContext from "../../context/CartContext";

import Header from "../Header";
import Footer from "../Footer";
import RestaurantItems from "../RestaurantItems";

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS"
};

class RestaurantItemDetails extends Component {
  state = {
    restaurantData: {},
    restaurantItemsData: [],
    apiStatus: apiStatusConstants.initial,
    quantity: 1,
    foodItemsData: {}
  };

  componentDidMount() {
    this.getRestaurantData();
  }

  getFormattedData = (data) => ({
    id: data.id,
    name: data.name,
    cuisine: data.cuisine,
    costForTwo: data.cost_for_two,
    reviewsCount: data.reviews_count,
    imageUrl: data.image_url,
    rating: data.rating,
    opensAt: data.opens_at,
    location: data.location,
    foodItems: data.food_items,
    cost: data.cost
  });

  getRestaurantData = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    this.setState({
      apiStatus: apiStatusConstants.inProgress
    });
    const jwtToken = Cookies.get("jwt_token");

    //'https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}'
    //const apiUrl = `https://apis.ccbp.in/products/${id}`;

    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`;

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      },
      method: "GET"
    };
    const response = await fetch(apiUrl, options);
    if (response.ok) {
      const fetchedData = await response.json();
      console.log(fetchedData);
      const updatedData = this.getFormattedData(fetchedData);
      //console.log(updatedData);
      const { foodItems } = updatedData;

      const updatedRestaurantItemsData = fetchedData.food_items.map(
        (eachSimilarProduct) => this.getFormattedData(eachSimilarProduct)
      );
      this.setState({
        restaurantData: updatedData,
        foodItemsData: foodItems,
        restaurantItemsData: updatedRestaurantItemsData,
        apiStatus: apiStatusConstants.success
      });
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure
      });
    }
  };

  renderLoadingView = () => (
    <div className="products-details-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  );

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  );

  onDecrementQuantity = () => {
    const { quantity } = this.state;
    if (quantity > 1) {
      this.setState((prevState) => ({ quantity: prevState.quantity - 1 }));
    }
  };

  onIncrementQuantity = () => {
    this.setState((prevState) => ({ quantity: prevState.quantity + 1 }));
  };

  renderProductDetailsView = () => (
    <CartContext.Consumer>
      {(value) => {
        const { restaurantData, quantity, restaurantItemsData } = this.state;
        const {
          id,
          name,
          cuisine,
          costForTwo,
          imageUrl,
          reviewsCount,
          rating,
          location,
          opensAt,
          foodItems
        } = restaurantData;

        const { addCartItem } = value;
        const onClickAddToCart = () => {
          addCartItem({ ...restaurantData, quantity });
        };

        return (
          <div className="product-details-success-view">
            <div className="product-details-container">
              <img src={imageUrl} alt="product" className="product-image" />
              <div className="product">
                <h1 className="product-name">{name}</h1>
                <p className="cuisine-description">{cuisine}</p>
                <p className="location">{location}</p>
                <div className="review-and-cost-container">
                  <div className="rating-and-reviews-count">
                    <div className="rating-container">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                        alt="star"
                        className="star"
                      />
                      <p className="rating">{rating}</p>
                    </div>
                    <p className="reviews-count">{reviewsCount} Reviews</p>
                  </div>
                  <div className="cost-container">
                    <p className="price-details">Rs {costForTwo}/-</p>
                    <p className="cost-for-two">Cost for two</p>
                  </div>
                </div>
                {/*
                <hr className="horizontal-line" />
                <div className="quantity-container">
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={this.onDecrementQuantity}
                    testid="minus"
                  >
                    <BsDashSquare className="quantity-controller-icon" />
                  </button>
                  <p className="quantity">{quantity}</p>
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={this.onIncrementQuantity}
                    testid="plus"
                  >
                    <BsPlusSquare className="quantity-controller-icon" />
                  </button>
                </div>
                <button
                  type="button"
                  className="button add-to-cart-btn"
                  onClick={onClickAddToCart}
                >
                  ADD TO CART
                </button>
*/}
              </div>
            </div>

            <ul className="similar-products-list">
              {restaurantItemsData.map((eachItem) => (
                <RestaurantItems productDetails={eachItem} key={eachItem.id} />
              ))}
            </ul>
          </div>
        );
      }}
    </CartContext.Consumer>
  );

  renderProductDetails = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      default:
        return null;
    }
  };

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderProductDetails()}
        </div>
        <Footer />
      </>
    );
  }
}

export default RestaurantItemDetails;

/* getFormattedData = (data) => ({
  availability: data.availability,
  brand: data.brand,
  description: data.description,
  id: data.id,
  imageUrl: data.image_url,
  price: data.price,
  rating: data.rating,
  title: data.title,
  totalReviews: data.total_reviews
});
*/
