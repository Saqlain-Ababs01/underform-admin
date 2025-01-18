import React from "react";
import NavBar from "../components/Navbar";
import ProductList from "../features/ProductList/components/ProductList";

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <ProductList />
    </div>
  );
};

export default HomePage;
