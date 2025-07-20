import { useGetUser } from "@/hooks/useAuthQueries";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { Navigate } from "react-router";

const AuthProcess = () => {
  const { data } = useGetUser();
  const { login } = useAuthStore((state) => state);

  const user = data?.user || null;

  useEffect(() => {
    if (user) {
      login(user);
    }
  }, [user, login]);

  if (user) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="size-16 rounded-full border-6 border-muted-foreground/80 border-t-primary animate-spin "></div>
    </div>
  );
};

export default AuthProcess;
