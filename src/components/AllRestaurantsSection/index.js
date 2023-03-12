import { Component } from "react";
import Loader from "react-loader-spinner";
import Cookies from "js-cookie";

import RestaurantCard from "../RestaurantCard";
import RestaurantsHeader from "../RestaurantsHeader";

import "./index.css";

const sortbyOptions = [
  {
    optionId: "Highest",
    displayText: "Price (High-Low)"
  },
  {
    optionId: "Lowest",
    displayText: "Price (Low-High)"
  }
];

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS"
};

class AllRestaurantsSection extends Component {
  state = {
    restaurantsList: [],
    apiStatus: apiStatusConstants.initial,
    activeOptionId: sortbyOptions[0].optionId,
    activeCategoryId: "",
    searchInput: "",
    activeRatingId: ""
  };

  componentDidMount() {
    this.getRestaurants();
  }

  getRestaurants = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress
    });
    const jwtToken = Cookies.get("jwt_token");
    const {
      activeOptionId,
      activeCategoryId,
      searchInput,
      activeRatingId,
      limit = "10",
      activePage
    } = this.state;

    const offset = (activePage - 1) * limit;

    //  const apiUrl =     ("const apiUrl = 'https://apis.ccbp.in/restaurants-list?offset=0&limit=9&sort_by_rating=Highest");

    // const apiUrl =      "https://apis.ccbp.in/restaurants-list?offset=0&limit=30&sort_by_rating=Highest";

    const apiUrl = "https://apis.ccbp.in/restaurants-list?limit=30";

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
      const updatedData = fetchedData.restaurants.map((restaurants) => ({
        cuisine: restaurants.cuisine,
        id: restaurants.id,
        imageUrl: restaurants.image_url,
        name: restaurants.name,
        rating: restaurants.user_rating.rating
      }));
      console.log(updatedData);
      this.setState({
        restaurantsList: updatedData,
        apiStatus: apiStatusConstants.success
      });
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure
      });
    }
  };

  updateActiceOptionId = (activeOptionId) => {
    this.setState(
      {
        activeOptionId
      },
      this.getRestaurants
    );
  };

  changeSortby = (activeOptionId) => {
    this.setState({ activeOptionId }, this.getProducts);
  };

  clearFilters = () => {
    this.setState(
      {
        searchInput: "",
        activeCategoryId: "",
        activeRatingId: ""
      },
      this.getProducts
    );
  };

  changeRating = (activeRatingId) => {
    this.setState({ activeRatingId }, this.getProducts);
  };

  changeCategory = (activeCategoryId) => {
    this.setState({ activeCategoryId }, this.getProducts);
  };

  enterSearchInput = () => {
    this.getProducts();
  };

  changeSearchInput = (searchInput) => {
    this.setState({ searchInput });
  };

  renderFailureView = () => (
    <div className="restaurents-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="restaurents-failure-img"
      />
      <h1 className="restaurents-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="restaurents-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  );

  renderRestaurentsListView = () => {
    const { restaurantsList, activeOptionId } = this.state;
    const shouldShowrestaurentsList = restaurantsList.length > 0;

    return shouldShowrestaurentsList ? (
      <div className="all-restaurents-container">
        <RestaurantsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          updateActiceOptionId={this.updateActiceOptionId}
        />
        <ul className="restaurents-list">
          {restaurantsList.map((restaurantsList) => (
            <RestaurantCard
              restaurentData={restaurantsList}
              key={restaurantsList.id}
            />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-restaurents-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          className="no-restaurents-img"
          alt="no products"
        />
        <h1 className="no-restaurents-heading">No Products Found</h1>
        <p className="no-restaurents-description">
          We could not find any products. Try other filters.
        </p>
      </div>
    );
  };

  renderLoadingView = () => (
    <div className="restaurents-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  );

  renderAllProducts = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurentsListView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      default:
        return null;
    }
  };

  render() {
    const { activeCategoryId, searchInput, activeRatingId } = this.state;

    return (
      <div className="all-restaurents-section">
        {/* <FiltersGroup
          searchInput={searchInput}
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          changeSearchInput={this.changeSearchInput}
          enterSearchInput={this.enterSearchInput}
          activeCategoryId={activeCategoryId}
          activeRatingId={activeRatingId}
          changeCategory={this.changeCategory}
          changeRating={this.changeRating}
          clearFilters={this.clearFilters}
        /> */}
        {this.renderAllProducts()}
      </div>
    );
  }
}

export default AllRestaurantsSection;

/*

const ratingsList = [
  {
    ratingId: "4",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png"
  },
  {
    ratingId: "3",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png"
  },
  {
    ratingId: "2",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png"
  },
  {
    ratingId: "1",
    imageUrl: "https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png"
  }
];

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS"
};

*/
