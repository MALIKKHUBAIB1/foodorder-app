import React, { useRef } from "react";
import logo from "../assets/logo.jpg";
import Modal from "./Modal";
import Button from "../UI/Button";
import Cart from "./Cart";

function Header({
  addtoCart,
  cartItems,
  incrementQuantity,
  quantityItems,
  totalPrice,
  decrementQuantity,
}) {
  const modal = useRef();
  function openModalHandle() {
    modal.current.open();
  }
  function closeModalHandle() {
    modal.current.close();
  }
  return (
    <>
      <Cart
        ref={modal}
        addtoCart={addtoCart}
        cartItems={cartItems}
        incrementQuantity={incrementQuantity}
        quantityItems={quantityItems}
        totalPrice={totalPrice}
        decrementQuantity={decrementQuantity}
        closeModalHandle={closeModalHandle}
      />
      <header id="main-header">
        <div id="title">
          <img src={logo} alt="Logo" /> <h1>REACTFOOD</h1>
        </div>
        <Button textOnly onClick={openModalHandle}>
          Cart (0)
        </Button>
      </header>
    </>
  );
}

export default Header;
