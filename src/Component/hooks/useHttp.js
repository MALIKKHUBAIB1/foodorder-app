import { useState, useEffect, useCallback } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  // if someething is wrong on backend
  const resData = await response.json();
  if (!response.ok)
    throw new Error(
      resData.message || "Something went wrong failed to send http request"
    );
  return resData;
}
export function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  function clearData() {
    setData(initialData);
  }
  const sendRequest = useCallback(
    async function sendRequest(data) {
      setLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError(error.message || "Something went wrong");
      }
      setLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && config.method === "GET") || !config.method || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);
  return { data, error, loading, sendRequest, clearData };
}
