import React, { useImperativeHandle, forwardRef, useRef } from "react";
import Cart from "./Cart";
import Button from "../UI/Button";

const CartModal = forwardRef(function Modal(
  { addtoCart, cartItems, children, className = "" },
  ref
) {
  const dialog = useRef();
  useImperativeHandle(ref, () => ({
    open: () => {
      if (dialog.current) {
        dialog.current.showModal();
      }
    },
    close: () => {
      if (dialog.current) {
        dialog.current.close();
      }
    },
  }));

  return (
    <dialog ref={dialog} className={`modal ${className}`}>
      {/* <Cart addtoCart={addtoCart} cartItems={cartItems} /> */}
      {children}
    </dialog>
  );
});
export default CartModal;
