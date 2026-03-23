import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard,
    children: [
      {
        path: "statistics",
      },
    ],
  },
]);
