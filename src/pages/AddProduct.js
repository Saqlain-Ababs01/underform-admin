import React from "react";
import { AddProductForm } from "../features/AddProduct/AddProduct";
import NavBar from "../components/Navbar";

const AddProduct = () => {
  return (
    <div>
      <NavBar />
      <div className="mx-auto max-w-7xl px-2 py-10 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-5">Add New Product</h1>
        <AddProductForm />
      </div>
    </div>
  );
};

export default AddProduct;
