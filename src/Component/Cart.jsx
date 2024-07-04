import React from "react";
import { forwardRef } from "react";
import Button from "../UI/Button";
import Modal from "./Modal";
import CartItem from "./CartItem";
const cartRef = forwardRef(function Cart(
  {
    cartItems,
    incrementQuantity,
    totalPrice,
    decrementQuantity,
    closeModalHandle,
  },
  ref
) {
  // if (cartItems) {
  //   return <p>Your Cart is Emptyy</p>;
  // }
  return (
    <Modal className="cart" ref={ref}>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => {
          // console.log(item.name);
          if (!item) return null;
          return (
            <CartItem
              key={item.id}
              name={item.name}
              qty={item.quantity}
              incrementQuantity={incrementQuantity}
              id={item.id}
              totalPrice={item.totalPrice}
              decrementQuantity={decrementQuantity}
            />
          );
        })}
      </ul>
      <p className="cart-total">total Price - {totalPrice.toFixed(2)}</p>
      <p className="modal-action">
        <Button textOnly onClick={closeModalHandle}>
          CLOSE
        </Button>
        <Button>GO to checkout</Button>
      </p>
    </Modal>
  );
});

export default cartRef;
