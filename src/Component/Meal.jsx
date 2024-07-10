import React from "react";
import MealsItem from "./MealsItem";
import { useHttp } from "./hooks/useHttp";
import Error from "./Error";
const requestConfig = {};

function Meal() {
  const { data, error, loading } = useHttp(
    "http://localhost:3000/meals",
    requestConfig,
    []
  );

  if (loading) return <p style={{ textAlign: "center" }}>Fetching Meals...</p>;
  if (error) return <Error title="Failed to fetch Meals" message={error} />;
  if (!data || data.length === 0) return <p>No meals available</p>;
  // console.log(data, "data");
  return (
    <ul id="meals">
      {data.map((meal) => (
        <MealsItem meal={meal} key={meal.id} />
      ))}
    </ul>
  );
}

export default Meal;
