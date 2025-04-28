import { useEffect, useState } from "react";

import productsApi from "apis/products";
import { Spinner, Typography } from "neetoui";
import { append, isNotNil } from "ramda";

import Carousel from "./Carousel";

const Product = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const response = await productsApi.show();
      console.log(response);
      setProduct(response);
      setLoading(false);
    } catch (error) {
      console.log("Error while fetching product", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const { name, description, imageUrl, imageUrls, mrp, offerPrice } = product;

  const finalMrp = (mrp / 100).toFixed(2);
  const finalOfferPrice = (offerPrice / 100).toFixed(2);
  const discount = (((mrp - offerPrice) / offerPrice) * 100).toFixed(2);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="px-6 pb-6">
      <div>
        <Typography className="py-2 text-4xl font-semibold" style="h1">
          {name}
        </Typography>
        <hr className="border-2 border-black" />
      </div>
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
          <Typography>MRP: ${finalMrp}</Typography>
          <Typography className="font-semibold">
            Offer price: ${finalOfferPrice}
          </Typography>
          <Typography className="font-semibold text-green-600">
            {discount}% off
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Product;
