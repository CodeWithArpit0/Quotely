import { createBrowserRouter, RouterProvider } from "react-router-dom";

// * Pages
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import NotFound from "./pages/NotFound/NotFound";
import Notes from "./pages/Notes/Notes";
import Home from "./pages/Home/Home";

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/notes",
      element: <Notes />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/changePassword",
      element: <ChangePassword />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
