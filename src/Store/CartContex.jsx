import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingItemsIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItems = [...state.items];
    const existingItem = state.items[existingItemsIndex];

    if (existingItemsIndex > -1) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      // don't directly mutate the state beacuse it will cause the problem and bug later
      // state.items[existingItemsIndex] = updatedItem; //don't update like this

      updatedItems[existingItemsIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  } else if (action.type === "REMOVE_ITEM") {
    const existingItemsIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    if (existingItemsIndex < 0) {
      return state;
    }
    const itemToRemove = state.items[existingItemsIndex];
    const updatedItems = [...state.items];

    if (itemToRemove.quantity === 1) {
      updatedItems.splice(existingItemsIndex, 1);
    } else {
      const updatedItem = {
        ...itemToRemove,
        quantity: itemToRemove.quantity - 1,
      };
      updatedItems[existingItemsIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  } else {
    return state;
  }
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartActions] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartActions({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatchCartActions({ type: "REMOVE_ITEM", id });
  }

  const cartContextValue = {
    items: cart.items,
    addItem,
    removeItem,
  };
  // console.log(cartContextValue);

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;

// import { createContext, useReducer } from "react";

// const CartContext = createContext({
//   items: [],
//   addItem: (item) => {},
//   removeItens: (id) => {},
// });
// function cartReducer(state, action) {
//   if (action.type === "ADD_ITEM") {
//     //... add items to the cart we will do that later
//     const existingItemsIndex = state.items.findIndex(
//       (item) => item.id === action.item.id
//     );
//     const updatedItems = [...state.items];
//     //we are using twice existingItems varibale so we make varibale to avoid dry priciple
//     const existingItems = state.items[existingItemsIndex];
//     if (existingItemsIndex > -1) {
//       const updatedItem = {
//         ...existingItems,
//         quantity: existingItems.quantity + 1,
//       };

//       updatedItems[existingItemsIndex] = updatedItem; //update like this
//     } else {
//       updatedItems.push({ ...action.item, quantity: 1 });
//     }
//     return { ...state, items: updatedItems };
//   } else if (action.type === "REMOVE_ITEM") {
//     // ... remove items from the cart we will do that later

//     const existingItemIndex = state.items.findIndex(
//       (item) => item.id === action.id
//     );
//     if (existingItemIndex < 0) {
//       return state;
//     }
//     const updatedItems = [...state.items];
//     const itemToRemove = updatedItems[existingItemIndex];

//     if (itemToRemove.quantity === 1) {
//       updatedItems.splice(existingItemIndex, 1);
//     } else {
//       const updatedItem = {
//         ...itemToRemove,
//         quantity: itemToRemove.quantity - 1,
//       };
//       updatedItems[existingItemIndex] = updatedItem;
//     }

//     // if (itemsToRemove.quantity === 1) {
//     //   updatedItems.splice(existingItemsIndex, 1);
//     //   //this is one of the way
//     //   // return {
//     //   //   ...state,
//     //   //   updatedItems: updatedItems.filter(
//     //   //     (item, index) => index !== existingItemsIndex
//     //   //   ),
//     //   // };
//     //   // second way of doing that
//     // } else {
//     //   const updatedItem = {
//     //     ...itemsToRemove,
//     //     quantity: itemsToRemove.quantity - 1,
//     //   };
//     //   updatedItems[existingItemsIndex] = updatedItem;

//     // }
//     return { ...state, items: updatedItems };
//   } else {
//     return state;
//   }
// }

// export function CartContextProvider({ children }) {
//   const { cart, dispatchCartActions } = useReducer(cartReducer, { items: [] });

//   function addItem(item) {
//     dispatchCartActions({ type: "ADD_ITEM", item: item });
//   }
//   function removeItem(id) {
//     dispatchCartActions({ type: "REMOVE_ITEM", id });
//   }
//   const cartContextValue = {
//     items: cart.items,
//     addItem,
//     removeItem,
//   };
//   console.log(cartContextValue);
//   return (
//     <CartContext.Provider value={cartContextValue}>
//       {children}
//     </CartContext.Provider>
//   );
// }
// export default CartContext;
