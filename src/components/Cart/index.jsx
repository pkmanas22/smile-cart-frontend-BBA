import { Header, PageLoader } from "components/common";
import { MRP, OFFER_PRICE } from "components/constants";
import { cartTotalOf } from "components/utils";
import { useFetchCartProducts } from "hooks/reactQuery/useProductsApi";
import { t } from "i18next";
import { NoData } from "neetoui";
import { isEmpty, keys } from "ramda";
import { useTranslation } from "react-i18next";
import useCartItemsStore from "stores/useCartItemsStore";
import withTitle from "utils/withTitle";

import PriceCard from "./PriceCard";
import ProductCard from "./ProductCard";

const Cart = () => {
  const { t } = useTranslation();

  // const { cartItems, setSelectedQuantity } = useCartItemsStore();

  const slugs = useCartItemsStore(store => keys(store.cartItems));
  // console.log(slugs);

  const { data: products = [], isLoading } = useFetchCartProducts(slugs);

  if (isLoading) return <PageLoader />;

  if (isEmpty(products)) {
    return (
      <div className="px-6 pb-6">
        <Header shouldDisplayBackButton title={t("cart.title")} />
        <div className="flex h-screen items-center justify-center">
          <NoData title={t("cart.empty")} />
        </div>
      </div>
    );
  }

  const totalMrp = cartTotalOf(products, MRP);
  const totalOfferPrice = cartTotalOf(products, OFFER_PRICE);

  return (
    <div className="px-6 pb-6">
      <Header shouldDisplayBackButton title={t("cart.title")} />
      <div className="mt-10 flex justify-center space-x-10">
        <div className="w-2/4 space-y-5">
          {products.map(product => (
            <ProductCard key={product.slug} {...product} />
          ))}
        </div>
        {totalMrp > 0 && (
          <div className="w-1/4">
            <PriceCard {...{ totalMrp, totalOfferPrice }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default withTitle(Cart, t("cart.title"));
