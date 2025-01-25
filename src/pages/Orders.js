import React from "react";
import AdminOrdersPage from "../features/Orders/OrdersTable";
import NavBar from "../components/Navbar";

const Orders = () => {
  return (
    <div>
      <NavBar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-5 ">
        <AdminOrdersPage />
      </div>
    </div>
  );
};

export default Orders;
