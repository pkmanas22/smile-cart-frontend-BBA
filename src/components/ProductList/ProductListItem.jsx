import { AddToCart } from "components/common";
import { Link } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

const ProductListItem = ({ name, offerPrice, imageUrl, slug }) => (
  <Link
    className="flex w-48 cursor-pointer flex-col justify-between rounded-md border border-solid border-black p-2 text-center"
    to={buildUrl(routes.products.show, { slug })}
  >
    <div className="space-y-3">
      <img alt={name} className="h-40 w-40" src={imageUrl} />
      <div className="font-bold">{name}</div>
      <div>${offerPrice}</div>
    </div>
    <div className="mt-auto">
      <AddToCart {...{ slug }} />
    </div>
  </Link>
);

export default ProductListItem;
