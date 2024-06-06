import useSWR from "swr";
import { backendAxiosGet } from ".";

export const useUser = () => {
  const getUserInfo = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/${process.env.NEXT_PUBLIC_USER_INFO}`;
  const { data, error, isLoading } = useSWR(getUserInfo, backendAxiosGet, {
    revalidateOnFocus: false,
  });
  return { data, error, isLoading };
};
