import { useEffect, useReducer, useState } from "react";
import Header from "./Component/Header";
import Meal from "./Component/Meal";
import { useFetch } from "./utils/UseMeals";
function reducer(state, action) {
  if (action.type === "addMeal") {
    const foundItem = state.meals.find((item) => item.id === action.payload);
    if (foundItem) {
      const existingItem = state.cartitems.some(
        (item) => item.id === foundItem.id
      );
      if (!existingItem) {
        const itemWithQuantity = { ...foundItem, quantity: 1 };
        return {
          ...state,
          cartitems: [...state.cartitems, itemWithQuantity],
        };
      }
    }
    return state;
  } else if (action.type === "setMeals") {
    return {
      ...state,
      meals: action.payload,
    };
  } else if (action.type === "incrementQuantity") {
    return {
      ...state,
      cartitems: state.cartitems.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              quantity: item.quantity + 1,
              // totalPrice: (item.quantity + 1) * item.price,
            }
          : item
      ),
    };
  } else if (action.type === "decrementQuantity") {
    return {
      ...state,
      cartitems: state.cartitems.map((item) =>
        item.id === action.payload && item.quantity > 0
          ? {
              ...item,
              quantity: item.quantity - 1,
              // totalPrice: (item.quantity - 1) * item.price,
            }
          : item
      ),
    };
  } else {
    return state;
  }
}

function App() {
  const { meals, loading, error } = useFetch("http://localhost:3000/meals", []);
  const [state, dispatch] = useReducer(reducer, {
    meals: [],
    cartitems: [],
  });

  useEffect(() => {
    if (meals) {
      dispatch({ type: "setMeals", payload: meals });
    }
  }, [meals]);

  function addMeals(id) {
    dispatch({ type: "addMeal", payload: id });
  }

  function incrementQuantity(id) {
    dispatch({ type: "incrementQuantity", payload: id });
  }

  function decrementQuantity(id) {
    dispatch({ type: "decrementQuantity", payload: id });
  }

  const totalPrice = state.cartitems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return (
    <>
      <Header
        addtoCart={addMeals}
        cartItems={state.cartitems}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        totalPrice={totalPrice}
      />
      <Meal addMeals={addMeals} meals={meals} loading={loading} error={error} />
      <h1>You got this 💪</h1>
      <p>Stuck? Not sure how to proceed?</p>
      <p>Don't worry - we've all been there. Let's build it together!</p>
    </>
  );
}

export default App;
