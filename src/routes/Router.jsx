import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
    },
    {
      path: "profile/:name",
    },
  ]);
  return <RouterProvider router={router} />;
};
export default Router;
