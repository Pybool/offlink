import { useCallback } from "react";
import useLoading from "./useLoading";
import axios from "@/axios";
import useNotification from "./useNotification";
import type { Credentials } from "@/types";

const useRegistration = ({ email, password }: Credentials) => {
  const { isLoading, startLoading, stopLoading } = useLoading();

  const {
    notification,
    setErrorNotification,
    setSuccessNotification,
    clearNotification,
  } = useNotification();

  const register = useCallback(async (): Promise<boolean> => {
    startLoading();
    clearNotification();

    const data = {
      email,
      password,
    };

    try {
      await axios.post("auth/register", data);
      setSuccessNotification("registration successful");
      stopLoading();
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

  return { register, isLoading, notification };
};

export default useRegistration;
