import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";
import { Navigate } from "react-router";
import { LogOut } from "lucide-react";
import { useLogout } from "@/hooks/useAuthQueries";

const Home = () => {
  const { isAuthenticated, user } = useAuthStore();
  const { mutate } = useLogout();
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-1/3">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">User Detail</CardTitle>
          <p>logged In user information</p>
        </CardHeader>
        <CardContent>
          '
          <div className="flex  items-center gap-6">
            <div className="size-16 shrink-0 rounded-full p-1 border">
              <img
                className="size-full rounded-full object-cover"
                src={user?.profilePic}
                alt="profile-image"
              />
            </div>
            <div className="flex-wrap">
              <p className="text-xl font-medium break-words">{user.username}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => mutate()} className="w-full flex gap-4">
            <LogOut />
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Home;
