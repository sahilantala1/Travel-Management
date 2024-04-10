import React, { useContext, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/thank-you.css";
import { AuthContext } from "../context/AuthContext";
import "./PayNow.css";

const PayNow = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Always add Razorpay payment button script inside 'form' tag
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.setAttribute("data-payment_button_id", "pl_NwqcSo0BIcwgcu");
    script.async = true;

    const form = document.getElementById("bookingForm");
    if (form) {
      form.appendChild(script);
    }

    return () => {
      if (form) {
        form.removeChild(script);
      }
    };
  }, [user]);

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="pt-5 text-center">
            <div className="thank__you">
              <span>
                <i className="ri-checkbox-circle-line"></i>
              </span>
              <h1 className="mb-3 fw-semibold">Pay Now</h1>

              {/* Render the form tag for Razorpay payment button */}
              <form
                className="btn primary__btn w-100 mt-4 btn btn-secondary"
                id="bookingForm"
              ></form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PayNow;
