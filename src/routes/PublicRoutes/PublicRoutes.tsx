import AuthProcess from "@/pages/AuthProcess/AuthProcess";
import Home from "@/pages/Home/Home";

export const PublicRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/verifying",
    element: <AuthProcess />,
  },
];
