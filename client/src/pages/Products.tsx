import { useParams } from "react-router";
import { useState, useMemo } from "react";
import Product from "../components/Product";
import { useFetchProducts } from "../hooks/products/useFetchProducts";
import Loader from "../components/Loader";
import FilterSort from "../components/FilterSort";

export default function Products() {
  const { categoryUrl } = useParams();

  const { products, isLoading } = useFetchProducts(categoryUrl);
  const [filterValue, setFilterValue] = useState("All");
  const [sortValue, setSortValue] = useState("low");

  const processedProducts = useMemo(() => {
    if (!products) return [];

    const filtered =
      filterValue === "All"
        ? products
        : products.filter(
            (product) => product.product_category === filterValue
          );

    return [...filtered].sort((a, b) => {
      if (sortValue === "low") {
        return a.product_price - b.product_price;
      } else {
        return b.product_price - a.product_price;
      }
    });
  }, [products, filterValue, sortValue]);

  if (isLoading) return <Loader />;
  if (!products || products.length === 0) return <p>Product list is empty</p>;

  const categoryName = categoryUrl ? categoryUrl : "All products";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl font-bold first-letter:uppercase">
          {categoryName || "All products"}
        </h2>

        <div className="flex items-center gap-4">
          <FilterSort
            type="filter"
            value={filterValue}
            onChange={setFilterValue}
          />
          <FilterSort type="sort" value={sortValue} onChange={setSortValue} />
        </div>
      </div>

      <div className="mb-4 text-sm text-gray-600">
        Showing {processedProducts.length} of {products.length} products
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {processedProducts.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
}
