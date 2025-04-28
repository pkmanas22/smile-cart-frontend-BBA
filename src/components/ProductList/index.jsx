import { useEffect, useState } from "react";

import productsApi from "apis/products";
import { Header, PageLoader } from "components/common";

import ProductListItem from "./ProductListItem";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { products } = await productsApi.fetch();
      // console.log(data);
      setProducts(products);
    } catch (error) {
      console.log("Error while fetching all products", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex flex-col px-6 pb-6">
      <Header title="Smile Cart" />
      <div className="m-auto grid grid-cols-2 justify-items-center gap-4 p-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-12">
        {products.map(item => (
          <ProductListItem key={item.slug} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
