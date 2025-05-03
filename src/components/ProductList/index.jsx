import { useEffect, useState } from "react";

import productsApi from "apis/products";
import { Header, PageLoader } from "components/common";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty } from "ramda";

import ProductListItem from "./ProductListItem";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");

  const debouncedSearchKey = useDebounce(searchKey);

  const fetchProducts = async () => {
    try {
      const { products } = await productsApi.fetch({
        searchTerm: debouncedSearchKey,
      });
      // console.log(products);
      setProducts(products);
    } catch (error) {
      console.log("Error while fetching all products", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(searchKey);

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearchKey]);

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex h-screen flex-col px-6 pb-6">
      <Header
        shouldDisplayBackButton={false}
        title="Smile Cart"
        searchAction={
          <Input
            placeholder="Search Products"
            prefix={<Search />}
            type="search"
            value={searchKey}
            onChange={e => setSearchKey(e.target.value)}
          />
        }
      />
      {isEmpty(products) ? (
        <NoData className="h-full w-full" title="No products to show" />
      ) : (
        <div className="m-auto grid grid-cols-2 justify-items-center gap-4 p-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-12">
          {products.map(item => (
            <ProductListItem key={item.slug} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
