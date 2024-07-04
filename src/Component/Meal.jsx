import React from "react";
import MealsItem from "./MealsItem";
import { useFetch } from "../utils/UseMeals";

function Meal({ addMeals, loading, meals, error }) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!meals || meals.length === 0) return <p>No meals available</p>;

  return (
    <ul id="meals">
      {meals.map((meal) => (
        <MealsItem meal={meal} addMeals={addMeals} key={meal.id} />
      ))}
    </ul>
  );
}

export default Meal;
