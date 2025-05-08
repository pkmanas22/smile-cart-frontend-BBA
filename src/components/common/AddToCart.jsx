import useSelectedQuantity from "hooks/useSelectedQuantity";
import { Button } from "neetoui";
import { isNil } from "ramda";
import { useTranslation } from "react-i18next";

import ProductQuantity from "./ProductQuantity";

const AddToCart = ({ slug, availableQuantity }) => {
  const { t } = useTranslation();

  // const [cartItems, setCartItems] = useContext(CartItemsContext);

  // const { isInCart, toggleIsInCart } = useCartItemsStore(
  //   store => ({
  //     isInCart: store.cartItems.includes(slug),
  //     toggleIsInCart: store.toggleIsInCart,
  //   }),
  //   shallow
  // );

  // const [selectedQuantity, setSelectedQuantity] = useCartItemsStore(
  //   paths([["cartItems", slug], ["setSelectedQuantity"]]),
  //   shallow
  // );

  const { selectedQuantity, updateSelectedQuantity } =
    useSelectedQuantity(slug);

  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    // setCartItems(prevItems =>
    //   prevItems.includes(slug)
    //     ? without([slug], cartItems)
    //     : [...prevItems, slug]
    // );

    // toggleIsInCart(slug);

    updateSelectedQuantity(1);
  };

  if (isNil(selectedQuantity)) {
    return (
      <Button label={t("addToCart")} size="medium" onClick={handleClick} />
    );
  }

  return <ProductQuantity {...{ slug, availableQuantity }} />;
};
export default AddToCart;
