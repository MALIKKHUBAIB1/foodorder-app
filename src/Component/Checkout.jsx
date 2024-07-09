import React, { useContext, useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import { usePostData } from "../utils/UseMeals";
import { isValidEmail, isNameValid } from "../utils/validation";
import UserProgressContext from "../Store/userProgressContex";
import CartContext from "../Store/CartContex";
function Checkout() {
  const { setData } = usePostData("http://localhost:3000/orders");
  const [mealData, setMealData] = useState({
    fullName: "",
    email: "",
    street: "",
    postalcode: "",
    city: "",
  });
  const [edit, setEdit] = useState({
    fullName: false,
    email: false,
    street: false,
    postalcode: false,
    city: false,
  });
  const userProgresCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContext);

  //totla Cart Price
  const totalCartPrice = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  const convertedPostalcode = +mealData.postalcode;
  // const isEmailValid = mealData.email && mealData.email.includes("@");
  const isEmailValid = isValidEmail(mealData.email);
  // const userName = mealData.fullName && mealData.fullName.length >= 3;
  const userName = isNameValid(mealData.fullName);
  const isValidStreet = mealData.street.length !== 0;
  const isValidPostalCode =
    mealData.postalcode &&
    !isNaN(convertedPostalcode) &&
    mealData.postalcode.length === 6;

  function onSubmitHandler(e) {
    e.preventDefault();
    if (!isEmailValid || !userName || !isValidStreet || !isValidPostalCode) {
      setEdit({
        fullName: true,
        email: true,
        street: true,
        postalcode: true,
        city: true,
      });
      return;
    }
    const orderData = {
      customer: {
        email: mealData.email,
        name: mealData.fullName,
        street: mealData.street,
        "postal-code": mealData.postalcode,
        city: mealData.city,
      },
      items: JSON.stringify(cartItems),
    };
    setData(orderData);
    setMealData({
      fullName: "",
      email: "",
      street: "",
      postalcode: "",
      city: "",
    }); // Close the modal after submission
  }

  function inputChangeHandler(type, value) {
    setMealData((prevValue) => ({
      ...prevValue,
      [type]: value,
    }));
  }

  function handleBlur(type) {
    setEdit((preValue) => ({
      ...preValue,
      [type]: true,
    }));
  }

  function handleCloseCheckout() {
    userProgresCtx.hideCheckout();
  }
  return (
    <Modal
      open={userProgresCtx.progress === "checkout"}
      onClose={handleCloseCheckout}
    >
      <form className="control" onSubmit={onSubmitHandler}>
        <h2>Checkout</h2>
        <p>Total Amout: {totalCartPrice} </p>
        <Input
          type="text"
          name="fullname"
          id="1"
          label="Full Name"
          value={mealData.fullName}
          onBlur={() => handleBlur("fullName")}
          onChange={(e) => inputChangeHandler("fullName", e.target.value)}
        />
        {edit.fullName && !userName && (
          <div className="error">Please Enter Valid Name</div>
        )}
        <Input
          type="email"
          name="email"
          id="2"
          label="E-mail Address"
          value={mealData.email}
          onBlur={() => handleBlur("email")}
          onChange={(e) => inputChangeHandler("email", e.target.value)}
        />
        {edit.email && !isEmailValid && (
          <div className="error">Please Enter Valid Email Address</div>
        )}
        <Input
          type="text"
          name="street"
          id="3"
          label="Street"
          onBlur={() => handleBlur("street")}
          value={mealData.street}
          onChange={(e) => inputChangeHandler("street", e.target.value)}
        />
        {edit.street && !isValidStreet && (
          <div className="error">Please Enter Valid Street</div>
        )}
        <div className="control-row">
          <Input
            type="text"
            name="postalcode"
            id="4"
            label="Postal code"
            value={mealData.postalcode}
            onBlur={() => handleBlur("postalcode")}
            onChange={(e) => inputChangeHandler("postalcode", e.target.value)}
          />
          {edit.postalcode && !isValidPostalCode && (
            <div className="error">Please Enter a Valid Postal Code</div>
          )}
          <Input
            type="text"
            name="city"
            id="5"
            label="City"
            value={mealData.city}
            onBlur={() => handleBlur("city")}
            onChange={(e) => inputChangeHandler("city", e.target.value)}
          />
        </div>
        <p className="modal-actions">
          <Button type="button" onClick={handleCloseCheckout} textOnly>
            Close
          </Button>

          <Button type="submit">Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
export default Checkout;
