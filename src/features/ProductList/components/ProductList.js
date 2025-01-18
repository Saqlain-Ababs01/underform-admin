import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CategoryFilters from "../../../components/CategoryFilters";
import { selectAllProducts } from "../ProductListSlice";

export default function ProductList() {
  const count = useSelector(selectAllProducts);
  const dispatch = useDispatch();

  return <CategoryFilters />;
}
