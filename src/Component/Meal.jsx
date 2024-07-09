import React from "react";
import MealsItem from "./MealsItem";
import { useFetch } from "../utils/UseMeals";

function Meal() {
  const { meals, loading, error } = useFetch("http://localhost:3000/meals", []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!meals || meals.length === 0) return <p>No meals available</p>;
  // console.log(meals);
  return (
    <ul id="meals">
      {meals.map((meal) => (
        <MealsItem meal={meal} key={meal.id} />
      ))}
    </ul>
  );
}

export default Meal;
