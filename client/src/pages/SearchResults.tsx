import { useSearchParams } from "react-router";
import { useSearchProducts } from "../hooks/useSearch";
import Loader from "../components/Loader";
import Product from "../components/Product";


export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  
  const { products, isLoading } = useSearchProducts(searchQuery);

  return (
    <div className="container mx-auto pt-24 px-4">
      <h1 className="text-2xl font-bold mb-6">
        Search Results for "{searchQuery}"
      </h1>
      
      {isLoading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-xl">No products found matching "{searchQuery}"</p>
          <p className="mt-2">Try a different search term or browse our categories</p>
        </div>
      )}
    </div>
  );
}