import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { fetchAllFilterProductsAsync } from "../../features/ProductList/ProductListSlice";
import { fetchAllFilterProductsAsync } from "../features/ProductList/ProductListSlice";
import MobileFilterDialog from "./MobileFilterDialog";
import DesktopFilters from "./DeskTopFilters";
import SortMenu from "./SortFilter";
import ProductGrid from "./ProductGrid";
import { FunnelIcon } from "@heroicons/react/20/solid";
export default function CategoryFilters() {
  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedSort, setSelectedSort] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(10);
  const [totalResults, setTotalResults] = useState(60);

  const handleFilterSelect = (e, sectionId, optionValue) => {
    console.log(e.target.checked);
    const newCategoryFilters = { ...selectedFilters };
    if (e.target.checked) {
      if (newCategoryFilters[sectionId]) {
        newCategoryFilters[sectionId].push(optionValue);
      } else {
        newCategoryFilters[sectionId] = [optionValue];
      }
    } else {
      const index = newCategoryFilters[sectionId].findIndex(
        (val) => val === optionValue
      );
      newCategoryFilters[sectionId].splice(index, 1);
    }
    setSelectedFilters(newCategoryFilters);
  };

  const handleSort = (sort, order) => {
    const newSortFilters = { _sort: sort, _order: order };
    setSelectedSort(newSortFilters);
  };
  console.log("selectedSort", selectedSort);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    const pagination = { page: currentPage, limit: resultsPerPage };
    dispatch(
      fetchAllFilterProductsAsync({
        filter: selectedFilters,
        sort: selectedSort,
        pagination,
      })
    );
  }, [dispatch, selectedFilters, selectedSort, currentPage, resultsPerPage]);

  return (
    <div className="bg-whit">
      <div>
        <MobileFilterDialog
          open={mobileFiltersOpen}
          setOpen={setMobileFiltersOpen}
          handleFilterSelect={handleFilterSelect}
        />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
            <div className="flex items-center">
              <SortMenu handleSort={handleSort} />
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <DesktopFilters handleFilterSelect={handleFilterSelect} />
              <ProductGrid
                currentPage={currentPage}
                totalResults={totalResults}
                resultsPerPage={resultsPerPage}
                handlePageChange={handlePageChange}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
