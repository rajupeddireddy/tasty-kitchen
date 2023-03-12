import { BsFilterRight } from "react-icons/bs";

import "./index.css";

const RestaurantsHeader = (props) => {
  const onChangeSortby = (event) => {
    const { updateActiceOptionId } = props;
    updateActiceOptionId(event.target.value);
  };

  const { sortbyOptions, activeOptionId } = props;
  return (
    <div className="restaurents-header">
      <div className="restaurents-head">
        <h1 className="restaurents-list-heading">Popular Restaurents</h1>
        <p className="header-description">
          Select your favorite Restaurents special dish and make your day
          happy...
        </p>
      </div>
      <div className="sort-by-container">
        <BsFilterRight className="sort-by-icon" />
        <p className="sort-by">Sort by</p>
        <select
          className="sort-by-select"
          value={activeOptionId}
          onChange={onChangeSortby}
        >
          {sortbyOptions.map((eachOption) => (
            <option
              key={eachOption.optionId}
              value={eachOption.optionId}
              className="select-option"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RestaurantsHeader;
