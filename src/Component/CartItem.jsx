import React, { useState, useEffect } from "react";

function CartItem({ name, qty, incrementQuantity, id, decrementQuantity }) {
  const [btndisabled, setBtnDisabled] = useState(false);
  useEffect(() => {
    if (qty <= 0) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [qty]);
  return (
    <li className="cart-item">
      <p>{name} </p>
      <p className="cart-item-actions">
        <button
          onClick={() => {
            incrementQuantity(id);
          }}
        >
          +
        </button>
        <span>{qty}</span>
        <button onClick={() => decrementQuantity(id)} disabled={btndisabled}>
          -
        </button>
      </p>
      {/* <p className="cart-total">total Price - {totalPrice}</p> */}
    </li>
  );
}

export default CartItem;
