import { useRouter } from "next/router";
import Preloader from "@/components/Preloader";
import useAuthenticated from "@/hooks/useAuthenticated";

const AuthMiddleware = ({ children }: any): JSX.Element => {
  const router = useRouter();

  const { isLoading, authenticated: isAuthenticated } = useAuthenticated();

  if (isLoading) return <Preloader />;

  if (isAuthenticated) return <>{children}</>;

  if (!isAuthenticated && !isLoading) {
    router.push("/login");
  }

  return <Preloader />;
};

export default AuthMiddleware;
