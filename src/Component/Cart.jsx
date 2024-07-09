import { useContext } from "react";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import CartContext from "../Store/CartContex";
import UserProgressContext from "../Store/userProgressContex";
import CartItem from "./CartItem";

function Cart() {
  const cartCtx = useContext(CartContext);
  const totalCartPrice = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);
  const cartProgressCtx = useContext(UserProgressContext);
  const closeCartHandler = () => {
    cartProgressCtx.hideCart();
  };
  function showCheckoutHandler() {
    cartProgressCtx.showCheckout();
  }
  return (
    <Modal
      className="cart"
      open={cartProgressCtx.progress === "cart"}
      onClose={cartProgressCtx.progress === "cart" ? closeCartHandler : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => {
          if (!item) return null;
          return (
            <CartItem
              item={item}
              key={item.id}
              onIncrease={() => cartCtx.addItem(item)}
              onDecrease={() => cartCtx.removeItem(item.id)}
            />
          );
        })}
      </ul>
      <p className="cart-total">$ {+totalCartPrice.toFixed(2)}</p>
      <p className="modal-action">
        <Button textOnly onClick={closeCartHandler}>
          CLOSE
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={showCheckoutHandler}>GO to checkout</Button>
        )}
      </p>
    </Modal>
  );
}

export default Cart;
