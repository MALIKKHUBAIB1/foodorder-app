import { useState, useEffect } from "react";

export function useFetch(url, initailData) {
  const [meals, setMeals] = useState(initailData);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (url) => {
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
        setError(err.message || "failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData(url);
  }, [url]);
  return { meals, loading, error };
}
export function usePostData(url) {
  const [orderData, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (orderData === null) return; // Skip fetching if data is not set yet
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ order: orderData }), // Correct structure
        });
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const resData = await res.json();
        console.log(resData, "useMeasl");
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
    fetchData();
  }, [url, orderData]);

  return { setData };
}
