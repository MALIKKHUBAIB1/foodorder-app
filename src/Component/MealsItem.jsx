import React from "react";
import Button from "../UI/Button";
function MealsItem({ meal, addMeals, }) {
  // console.log(addMeals);
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.image} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">${meal.price}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button textOnly={false} onClick={() => addMeals(meal.id)}>
            Add to Cart
          </Button>
        </p>
      </article>
    </li>
  );
}

export default MealsItem;
