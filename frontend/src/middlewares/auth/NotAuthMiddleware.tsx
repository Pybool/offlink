import { useRouter } from "next/router";
import Preloader from "@/components/Preloader";
import useAuthenticated from "@/hooks/useAuthenticated";

const NotAuthMiddleware = ({ children }: any): JSX.Element => {
  const router = useRouter();

  const { isLoading, authenticated: isAuthenticated } = useAuthenticated();

  if (isLoading) return <Preloader />;

  if (!isAuthenticated && !isLoading) return <>{children}</>;

  if (isAuthenticated) {
    router.push("/dashboard");
  }

  return <Preloader />;
};

export default NotAuthMiddleware;
