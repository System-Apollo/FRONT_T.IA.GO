import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthComponent = (props: any) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/");
      } else {
        setIsAuthenticated(true)
      }
    }, [router]);

    if (isAuthenticated === null) {
      return <div>Carregando...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
