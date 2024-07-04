import { useState, useEffect } from "react";

export function useFetch(url, initailData) {
  const [meals, setMeals] = useState(initailData);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData(url) {
      setLoading(true);
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Fetching data failed");
        }
        const data = await res.json();
        setMeals(data);
        setLoading(true);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData(url);
  }, [url]);
  return { meals, loading, error };
}
