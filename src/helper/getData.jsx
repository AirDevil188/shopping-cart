import { useState, useEffect } from "react";
import { getRequestFetch } from "./fetchData";

const getData = (url) => {
  console.log(url);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getRequestFetch(`https://fakestoreapi.com${url}`);
        if (data.length > 1) {
          setData(
            data.map((item) => {
              return { ...item, quantity: 1 };
            })
          );
        } else {
          console.log("one");
          setData(() => [{ ...data, quantity: 1 }]);
        }
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [url]);

  return { data, loading, error };
};

export default getData;
