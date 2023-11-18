import { useEffect, useState } from "react";
import useLoading from "./useLoading";
import isAuthenticated from "@/middlewares/auth/helpers/isAuthenticated";

const useAuthenticated = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const { isLoading, startLoading, stopLoading } = useLoading(true);

  useEffect(() => {
    startLoading();
    const authenticated = async () => {
      if (await isAuthenticated()) {
        setAuthenticated(true);
      }
      stopLoading();
    };

    authenticated();
  }, []);
  return { isLoading, authenticated };
};

export default useAuthenticated;
