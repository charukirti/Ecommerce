import { useFetchProducts } from "../hooks/products/useFetchProducts";
import Loader from "./Loader";
import Product from "./Product";

interface RelatedProductsProps {
  categoryName: string | undefined;
}

 
export default function RelatedProducts({ categoryName }: RelatedProductsProps) {
  const { products, isLoading } = useFetchProducts(categoryName);
  
  if (isLoading) return <Loader />;
  

  if (!products || products.length === 0) {
    return <p className="text-gray-500 mt-8">No related products found</p>;
  }
  
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.slice(0, 4).map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}