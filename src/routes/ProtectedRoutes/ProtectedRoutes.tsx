
import Login from "@/pages/Login/Login";
import Signup from "@/pages/Signup/Signup";

export const ProtectedRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
 
];
