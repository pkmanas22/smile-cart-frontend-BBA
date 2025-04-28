import { useEffect, useState } from "react";

import productsApi from "apis/products";
import { Spinner, Typography } from "neetoui";

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

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  console.log(products);

  return (
    <div className="flex flex-col">
      <div className="m-2">
        <Typography className="mx-6 mb-2 mt-6" style="h1" weight="semibold">
          Smile Cart
        </Typography>
        <hr className="neeto-ui-bg-black h-1" />
      </div>
      <div className="m-auto grid grid-cols-2 justify-items-center gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map(item => (
          <ProductListItem key={item.slug} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
