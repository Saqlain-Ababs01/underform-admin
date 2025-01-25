import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import {
//   fetchAllProductsAsync,
//   selectAllProducts,
// } from "../../features/ProductList/ProductListSlice";
import {
  fetchAllProductsAsync,
  selectAllProducts,
} from "../features/ProductList/ProductListSlice";
import { useEffect } from "react";
import { Button } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

export default function ProductCatalogs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(selectAllProducts);
  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  const handleAddProductClick = () => {
    navigate("/AddProduct");
  };
  const handleEditButtonClick = () => {
    navigate("/EditProduct");
  };
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4  sm:px-6  md:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Products
        </h2>
        <Button className="py-2" onClick={handleAddProductClick}>
          Add Products
        </Button>
        {products.length === 0 ? (
          <p className="text-gray-500">No products available</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2  md:grid-cols-3  xl:gap-x-8">
            {products.map((product, index) => (
              <div>
                <Link to="product-details" key={index}>
                  <div className="group relative">
                    <img
                      alt={product.title}
                      src={product.thumbnail || product.images[0]}
                      className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                    />
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.category || "No color specified"}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {product.price || "N/A"}
                      </p>
                    </div>
                  </div>
                </Link>
                <Button className="py-2" onClick={handleEditButtonClick}>
                  Edit Product
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
