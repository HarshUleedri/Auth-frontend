import NotFound from "@/pages/NotFound/NotFound";
import { ProtectedRoutes } from "./ProtectedRoutes/ProtectedRoutes";
import { PublicRoutes } from "./PublicRoutes/PublicRoutes";
import { createBrowserRouter, RouterProvider } from "react-router";

const Routers = () => {
  const router = createBrowserRouter([
    ...PublicRoutes,
    ...ProtectedRoutes,
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routers;
