import axios from "axios";

const fetcher = async (url: string) => {
  const response = await axios.get(url, {
    withCredentials: true,
  });
  return response.data;
};

const backendAxiosGet = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export { backendAxiosGet, fetcher };
