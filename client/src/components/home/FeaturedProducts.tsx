import { Link } from "react-router";
import Product from "../Product";
import { useFetchProducts } from "../../hooks/products/useFetchProducts";


export default function FeaturedProducts() {
  const { products, isLoading } = useFetchProducts();

  if (isLoading) <p>Loading products...</p>;
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link
            to="/products"
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products?.slice(0, 8)?.map((product) => (
            <Product product={product} key={product.id}/>
          ))}
        </div>
      </div>
    </section>
  );
}
