import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // Redirect to login if token is not found
    }
  }, [router]);

  // Ensure that useRouter is only called when router is available
  if (!router) {
    return null; // or Loading indicator if necessary
  }

  return <>{children}</>;
};

export default ProtectedRoute;
