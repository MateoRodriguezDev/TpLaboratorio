import ProductCard from "../../components/ProductCard";
import { useProductStore } from "../../stores/productsStore";



export default function ProductsView() {
  

  const products = useProductStore(state => state.allProducts)
  return (
    <>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id!}
          name={product.name}
          description={product.description}
          quantity={product.quantity}
          price={product.price}
        />
      ))}
    </>
  )
}
