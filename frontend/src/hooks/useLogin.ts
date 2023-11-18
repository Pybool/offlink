import { useCallback } from "react";
import useLoading from "./useLoading";
import axios from "@/axios";
import useNotification from "./useNotification";
import type { Credentials } from "@/types";

const useLogin = ({ email, password }: Credentials) => {
  const { isLoading, startLoading, stopLoading } = useLoading();

  const {
    notification,
    setErrorNotification,
    setSuccessNotification,
    clearNotification,
  } = useNotification();

  const login = useCallback(async (): Promise<boolean> => {
    startLoading();
    clearNotification();

    const data = {
      email,
      password,
    };

    try {
      const response = await axios.post("auth/login", data);
      setSuccessNotification("login successfully");
      stopLoading();
      localStorage.setItem("token", response.data.accessToken);
      return true;
    } catch (error: any) {
      if (error.response) {
        setErrorNotification(error?.response?.data?.error?.message);
      } else if (error.request) {
        setErrorNotification("no response from server");
      } else {
        setErrorNotification("unexpected error");
      }
    }
    stopLoading();
    return false;
  }, [email, password]);

  return { login, isLoading, notification };
};

export default useLogin;
