import { useContext } from "react";
import logo from "../assets/logo.jpg";
import Button from "../UI/Button";
import CartContext from "../Store/CartContex";
import UserProgressContext from "../Store/userProgressContex";
function Header() {
  const cartCtx = useContext(CartContext);
  const totalCartItems = cartCtx.items.reduce((totalNumber, item) => {
    return totalNumber + item.quantity;
  }, 0);

  const userProgressCtx = useContext(UserProgressContext);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="Logo" />
        <h1>REACTFOOD</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}

export default Header;
