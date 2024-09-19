import { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY } from "../constants";

export const useAPI = (searchText, pageNumber, limit = 10) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://stageapi.monkcommerce.app/task/products/search?search=${searchText}&page=${pageNumber}&limit=${limit}`,
          {
            headers: {
              "x-api-key": API_KEY,
            },
          }
        );

        const newData = response.data;
        setData(newData);

        // Stop loading more if less than the limit is returned (means we've fetched all the data)
        if (newData.length < limit) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchText, pageNumber, limit]);

  return [data, loading, hasMore];
};
