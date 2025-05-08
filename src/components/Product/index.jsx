import { useEffect, useState } from "react";

import productsApi from "apis/products";
import { AddToCart, Header, PageLoader, PageNotFound } from "components/common";
import useSelectedQuantity from "hooks/useSelectedQuantity";
import { t } from "i18next";
import { Button, Typography } from "neetoui";
import { append, isNotNil } from "ramda";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import routes from "routes";
import withTitle from "utils/withTitle";

import Carousel from "./Carousel";

const Product = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { t } = useTranslation();

  const { slug } = useParams();

  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const fetchProduct = async () => {
    try {
      const response = await productsApi.show(slug);
      console.log(response);
      setProduct(response);
    } catch (error) {
      console.log(t("error.genericError", { error }));
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (isError) return <PageNotFound />;

  const {
    name,
    description,
    imageUrl,
    imageUrls,
    mrp,
    offerPrice,
    availableQuantity,
  } = product;

  const finalMrp = (mrp / 100).toFixed(2);
  const finalOfferPrice = (offerPrice / 100).toFixed(2);
  const discount = (((mrp - offerPrice) / offerPrice) * 100).toFixed(2);

  if (loading) return <PageLoader />;

  return (
    <div className="px-6 pb-6">
      <Header shouldDisplayBackButton title={name} />
      <div className="mt-16 flex gap-4">
        <div className="w-2/5">
          <div className="flex justify-center gap-16">
            {isNotNil(imageUrls) ? (
              <Carousel imageUrls={append(imageUrl, imageUrls)} title={name} />
            ) : (
              <img alt={name} className="w-48" src={imageUrl} />
            )}
          </div>
        </div>
        <div className="w-3/5 space-y-4">
          <Typography>{description}</Typography>
          <Typography>{t("mrp", { mrp: finalMrp })}</Typography>
          <Typography className="font-semibold">
            {t("offerPrice", { offerPrice: finalOfferPrice })}
          </Typography>
          <Typography className="font-semibold text-green-600">
            {t("discount", { discount })}
          </Typography>
          <div className="flex space-x-10">
            <AddToCart {...{ availableQuantity, slug }} />
            <Button
              className="bg-neutral-800 hover:bg-neutral-950"
              label={t("buyNow")}
              size="large"
              to={routes.checkout}
              onClick={() => setSelectedQuantity(selectedQuantity || 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTitle(Product, t("product"));
