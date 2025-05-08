import { useContext, useEffect, useState } from "react";

import productsApi from "apis/products";
import { Header, PageLoader } from "components/common";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty, without } from "ramda";
import { useTranslation } from "react-i18next";
import CartItemsContext from "src/contexts/CartItemsContext";

import ProductListItem from "./ProductListItem";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");

  const { t } = useTranslation();

  const debouncedSearchKey = useDebounce(searchKey);

  const [cartItems, setCartItems] = useContext(CartItemsContext);

  const fetchProducts = async () => {
    try {
      const { products } = await productsApi.fetch({
        searchTerm: debouncedSearchKey,
      });
      // console.log(products);
      setProducts(products);
    } catch (error) {
      console.log(t("error.genericError", { error }));
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(searchKey);

  const toggleIsInCart = slug => {
    setCartItems(prev =>
      prev.includes(slug) ? without([slug], cartItems) : [...prev, slug]
    );
  };

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearchKey]);

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex h-screen flex-col px-6 pb-6">
      <Header
        cartItemsCount={cartItems.length}
        shouldDisplayBackButton={false}
        title={t("title")}
        searchAction={
          <Input
            placeholder={t("searchProducts")}
            prefix={<Search />}
            type="search"
            value={searchKey}
            onChange={e => setSearchKey(e.target.value)}
          />
        }
      />
      {isEmpty(products) ? (
        <NoData className="h-full w-full" title={t("noData")} />
      ) : (
        <div className="m-auto grid grid-cols-2 justify-items-center gap-4 p-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-12">
          {products.map(item => (
            <ProductListItem
              isInCart={cartItems.includes(item.slug)}
              key={item.slug}
              toggleIsInCart={() => toggleIsInCart(item.slug)}
              {...item}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
