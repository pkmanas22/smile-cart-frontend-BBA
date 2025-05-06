import useSelectedQuantity from "hooks/useSelectedQuantity";
import { Button } from "neetoui";
import { isNil } from "ramda";

import ProductQuantity from "./ProductQuantity";

const AddToCart = ({ slug, availableQuantity }) => {
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
    return <Button label="Add to cart" size="medium" onClick={handleClick} />;
  }

  return <ProductQuantity {...{ slug, availableQuantity }} />;
};
export default AddToCart;
