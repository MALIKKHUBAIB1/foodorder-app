import React, { useContext, useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import { useHttp } from "./hooks/useHttp";
import UserProgressContext from "../Store/userProgressContex";
import CartContext from "../Store/CartContex";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

function Checkout() {
  const {
    data,
    error,
    loading: isSending,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig, []);
  const [requestSuccessful, setRequestSuccessful] = useState(false);

  const userProgresCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContext);

  // Total Cart Price
  const totalCartPrice = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  async function onSubmitHandler(e) {
    e.preventDefault();

    const fd = new FormData(e.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
    setRequestSuccessful(true);
  }
  function handleFinish() {
    userProgresCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
    setRequestSuccessful(false);
  }
  function handleCloseCheckout() {
    userProgresCtx.hideCheckout();
  }

  let actions = (
    <>
      <Button type="button" onClick={handleCloseCheckout} textOnly>
        Close
      </Button>
      <Button type="submit">Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }
  if (data && requestSuccessful && !error) {
    return (
      <Modal
        open={userProgresCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you soon with more details via email within a
          minute.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgresCtx.progress === "checkout"}
      onClose={handleCloseCheckout}
    >
      <form onSubmit={onSubmitHandler}>
        <h2>Checkout</h2>
        <p>Total Amount: {totalCartPrice}</p>
        <Input type="text" id="name" label="Full Name" />

        <Input type="email" id="email" label="E-mail Address" />

        <Input type="text" id="street" label="Street" />

        <div className="control-row">
          <Input type="text" id="postal-code" label="Postal code" />

          <Input type="text" id="city" label="City" />
        </div>
        {error && (
          <Error title="Failed to send the order data" message={error} />
        )}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}

export default Checkout;

// import React, { useContext, useEffect, useState } from "react";
// import Input from "../UI/Input";
// import Button from "../UI/Button";
// import Modal from "../UI/Modal";
// import { useHttp } from "./hooks/useHttp";
// import { isValidEmail, isNameValid } from "../utils/validation";
// import UserProgressContext from "../Store/userProgressContex";
// import CartContext from "../Store/CartContex";
// import Error from "./Error";
// const requestConfig = {
//   method: "POST",
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
// };
// function Checkout() {
//   const {
//     data,
//     error,
//     loading: isSending,
//     sendRequest,
//   } = useHttp("http://localhost:3000/orders", requestConfig, []);
//   // const [mealData, setMealData] = useState({
//   //   fullName: "",
//   //   email: "",
//   //   street: "",
//   //   postalcode: "",
//   //   city: "",
//   // });
//   // const [edit, setEdit] = useState({
//   //   fullName: false,
//   //   email: false,
//   //   street: false,
//   //   postalcode: false,
//   //   city: false,
//   // });
//   const userProgresCtx = useContext(UserProgressContext);
//   const cartCtx = useContext(CartContext);

//   //totla Cart Price
//   const totalCartPrice = cartCtx.items.reduce((totalPrice, item) => {
//     return totalPrice + item.quantity * item.price;
//   }, 0);

//   // const convertedPostalcode = +mealData.postalcode;
//   // // const isEmailValid = mealData.email && mealData.email.includes("@");
//   // const isEmailValid = isValidEmail(mealData.email);
//   // // const userName = mealData.fullName && mealData.fullName.length >= 3;
//   // const userName = isNameValid(mealData.fullName);
//   // const isValidStreet = mealData.street.length !== 0;
//   // const isValidPostalCode =
//   //   mealData.postalcode &&
//   //   !isNaN(convertedPostalcode) &&
//   //   mealData.postalcode.length === 6;

//   async function onSubmitHandler(e) {
//     e.preventDefault();

//     const fd = new FormData(e.target);
//     const customerData = Object.fromEntries(fd.entries(fd));
//     console.log(customerData);

//     // async function postData() {
//     // const res = await fetch(
//     //   "http://localhost:3000/orders",
//     //   {
//     //     requestConfig,
//     //     body: JSON.stringify({
//     //       order: {
//     //         items: cartCtx.items,
//     //         customer: customerData,
//     //       },
//     //     }),
//     //   },
//     //   []
//     // );

//     sendRequest(
//       JSON.stringify({
//         order: {
//           items: cartCtx.items,
//           customer: customerData,
//         },
//       })
//     );
//     // if (!res.ok) {
//     //   throw new Error("Failed to send order");
//     // }
//     // const data = await res.json();
//     // console.log(data);
//     // }
//     // useEffect(() => {
//     //   postData();
//     // }, []);

//     // console.log(fd);
//     // if (!isEmailValid || !userName || !isValidStreet || !isValidPostalCode) {
//     //   setEdit({
//     //     fullName: true,
//     //     email: true,
//     //     street: true,
//     //     postalcode: true,
//     //     city: true,
//     //   });
//     //   return;
//     // }
//     // const orderData = {
//     //   customer: {
//     //     email: mealData.email,
//     //     name: mealData.fullName,
//     //     street: mealData.street,
//     //     "postal-code": mealData.postalcode,
//     //     city: mealData.city,
//     //   },
//     //   items: JSON.stringify(cartItems),
//     // };
//     // setData(orderData);
//     // setMealData({
//     //   fullName: "",
//     //   email: "",
//     //   street: "",
//     //   postalcode: "",
//     //   city: "",
//     // }); // Close the modal after submission
//   }

//   // function inputChangeHandler(type, value) {
//   //   setMealData((prevValue) => ({
//   //     ...prevValue,
//   //     [type]: value,
//   //   }));
//   // }

//   // function handleBlur(type) {
//   //   setEdit((preValue) => ({
//   //     ...preValue,
//   //     [type]: true,
//   //   }));
//   // }

//   function handleCloseCheckout() {
//     userProgresCtx.hideCheckout();
//   }
//   let actions = (
//     <>
//       <Button type="button" onClick={handleCloseCheckout} textOnly>
//         Close
//       </Button>
//       <Button type="submit">Submit Order</Button>
//     </>
//   );
//   if (isSending) {
//     actions = <span>sending order data...</span>;
//   }

//   if (data && !error) {
//     return (
//       <Modal
//         open={userProgresCtx.progress === "checkout"}
//         onClose={handleCloseCheckout}
//       >
//         <h2>Success</h2>
//         <p>Your Order was submitted sucessFully</p>
//         <p>
//           we will get back to you soon with more detail via email wihtin the
//           minute
//         </p>
//         <p className="modal-actions">
//           <Button onClick={handleCloseCheckout}>Okay</Button>
//         </p>
//       </Modal>
//     );
//   }
//   return (
//     <Modal
//       open={userProgresCtx.progress === "checkout"}
//       onClose={handleCloseCheckout}
//       // className="checkout"
//     >
//       <form onSubmit={onSubmitHandler}>
//         <h2>Checkout</h2>
//         <p>Total Amout: {totalCartPrice} </p>
//         <Input
//           type="text"
//           // name="fullname"
//           id="name"
//           label="Full Name"
//           // value={mealData.fullName}
//           // onBlur={() => handleBlur("fullName")}
//           // onChange={(e) => inputChangeHandler("fullName", e.target.value)}
//         />
//         {/* {edit.fullName && !userName && (
//           <div className="error">Please Enter Valid Name</div>
//         )} */}
//         <Input
//           type="email"
//           // name="email"
//           id="email"
//           label="E-mail Address"
//           // value={mealData.email}
//           // onBlur={() => handleBlur("email")}
//           // onChange={(e) => inputChangeHandler("email", e.target.value)}
//         />
//         {/* {edit.email && !isEmailValid && (
//           <div className="error">Please Enter Valid Email Address</div>
//         )} */}
//         <Input
//           type="text"
//           // name="street"
//           id="street"
//           label="Street"
//           // onBlur={() => handleBlur("street")}
//           // // value={mealData.street}
//           // onChange={(e) => inputChangeHandler("street", e.target.value)}
//         />
//         {/* {edit.street && !isValidStreet && (
//           <div className="error">Please Enter Valid Street</div>
//         )} */}
//         <div className="control-row">
//           <Input
//             type="text"
//             // name="postalcode"
//             id="postal-code"
//             label="Postal code"
//             // value={mealData.postalcode}
//             // onBlur={() => handleBlur("postalcode")}
//             // onChange={(e) => inputChangeHandler("postalcode", e.target.value)}
//           />
//           {/* {edit.postalcode && !isValidPostalCode && (
//             <div className="error">Please Enter a Valid Postal Code</div>
//           )} */}
//           <Input
//             type="text"
//             // name="city"
//             id="city"
//             label="City"
//             //  value={mealData.city}
//             // onBlur={() => handleBlur("city")}
//             // onChange={(e) => inputChangeHandler("city", e.target.value)}
//           />
//         </div>
//         {error && (
//           <Error title="failed to send the order  data " message={error} />
//         )}
//         <p className="modal-actions">{actions}</p>
//       </form>
//     </Modal>
//   );
// }
// export default Checkout;
