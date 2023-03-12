import { Link } from "react-router-dom";
import Header from "../Header";
import { AiOutlineCheck } from "react-icons/ai";
import "./index.css";

const PaymentSuccessfull = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="successfull-card">
          <AiOutlineCheck className="tick-icon" />
          <h1 className="successfull-heading">Payment Successfull</h1>
          <p className="successfull-description">Thank you for ordering</p>
          <p className="successfull-description">
            Your payment is successfully completed.
          </p>

          <Link to="/">
            <button type="button" className="goto-home-btn">
              Go To Home Page
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccessfull;
