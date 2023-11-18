import { useState } from "react";

type Notification = {
  type?: "success" | "error";
  message?: string;
};

const useNotification = () => {
  const [notification, setNotification] = useState<Notification>({});

  const setSuccessNotification = (message: string) => {
    setNotification({
      type: "success",
      message,
    });
  };

  const setErrorNotification = (message: string) => {
    setNotification({
      type: "error",
      message,
    });
  };

  const clearNotification = () => {
    setNotification({});
  };

  return {
    notification,
    setErrorNotification,
    setSuccessNotification,
    clearNotification,
  };
};

export default useNotification;
