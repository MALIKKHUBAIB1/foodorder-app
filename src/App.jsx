import Header from "./Component/Header";
import Meal from "./Component/Meal";
import Cart from "./Component/Cart";
import Chekout from "./Component/Checkout";
import { CartContextProvider } from "./Store/CartContex";
import { UserProgressContextProvider } from "./Store/userProgressContex";
function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meal />
        <Cart />
        <Chekout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
