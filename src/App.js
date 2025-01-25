import React from "react";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Orders from "./pages/Orders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/AddProduct",
    element: <AddProduct />,
  },
  {
    path: "/EditProduct",
    element: <EditProduct />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
