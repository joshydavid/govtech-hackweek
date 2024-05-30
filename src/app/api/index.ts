import axios from "axios";
import { env } from "next-runtime-env";

const axiosInstance = axios.create({
  baseURL: env("NEXT_PUBLIC_SERVER_BASE_URL"),
  withCredentials: true,
});

const backendAxiosGet = async (url: string) => {
  const response = await axiosInstance.get(url);
  return response.data;
};

const backendAxiosPost = async <T>(url: string, data?: T) => {
  const response = await axiosInstance.post(url, data);
  return response;
};

export { axiosInstance, backendAxiosGet, backendAxiosPost };
