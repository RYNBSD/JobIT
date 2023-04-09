import { useState, useEffect } from "react";
import axios from "axios";
import { RAPID_API_KEY } from "@env";

const rapidApiKey = RAPID_API_KEY;

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": `${rapidApiKey}`,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  }

  const fetchData = async () => {
    setIsLoading(true);

    try {
      // console.log(2);
      const response = await axios.request(options);
      // console.log(response);
      // console.log(3);
      setData(response.data.data);
    }
    catch (e) {
      setError(e.message);
      setIsError(true);
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(1);

  const refetch = () => {
    fetchData();
  }

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  }
}

export default useFetch;