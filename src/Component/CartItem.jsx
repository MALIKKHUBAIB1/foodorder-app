import React, { useContext } from "react";
function CartItem({ item, onDecrease, onIncrease }) {
  const { name, price, quantity } = item;
  const newPrice = +price;
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} x ${newPrice.toFixed(2)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onIncrease}>+</button>
        <span>{quantity}</span>
        <button onClick={onDecrease}>-</button>
      </p>
    </li>
  );
}

export default CartItem;
