import React from "react";
import NavBar from "../components/Navbar";
import { EditProductForm } from "../features/EditProduct/EditProduct";

const AddProduct = () => {
  return (
    <div>
      <NavBar />
      <div className="mx-auto max-w-7xl px-2 py-10 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-5">Edit Product</h1>
        <EditProductForm />
      </div>
    </div>
  );
};

export default AddProduct;
