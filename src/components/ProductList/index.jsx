import { useState } from "react";

import { Header, PageLoader } from "components/common";
import { useFetchProducts } from "hooks/reactQuery/useProductsApi";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import withTitle from "utils/withTitle";

import ProductListItem from "./ProductListItem";

const ProductList = () => {
  const [searchKey, setSearchKey] = useState("");

  const { t } = useTranslation();

  const debouncedSearchKey = useDebounce(searchKey);

  const { data: { products = [] } = {}, isLoading } = useFetchProducts({
    searchTerm: debouncedSearchKey,
  });

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex h-screen flex-col px-6 pb-6">
      <Header
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
            <ProductListItem key={item.slug} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default withTitle(ProductList);
