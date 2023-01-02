import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ErrorLayout, KanbanLayout } from "../component/layout/KanbanLayout";
import { KanbanContainer } from "../containers/KanbanContainer";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <KanbanLayout children={<Outlet />} />,
      children: [{ path: "/", element: <KanbanContainer /> }],
      errorElement: <ErrorLayout />,
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

const ReactRouterProvider = () => {
  return <RouterProvider router={router} />;
};

export { ReactRouterProvider };
