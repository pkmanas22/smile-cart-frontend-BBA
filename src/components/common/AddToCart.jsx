import { Button } from "neetoui";
import useCartItemsStore from "stores/useCartItemsStore";
import { shallow } from "zustand/shallow";

const AddToCart = ({ slug }) => {
  // const [cartItems, setCartItems] = useContext(CartItemsContext);

  const { isInCart, toggleIsInCart } = useCartItemsStore(
    store => ({
      isInCart: store.cartItems.includes(slug),
      toggleIsInCart: store.toggleIsInCart,
    }),
    shallow
  );

  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    // setCartItems(prevItems =>
    //   prevItems.includes(slug)
    //     ? without([slug], cartItems)
    //     : [...prevItems, slug]
    // );
    toggleIsInCart(slug);
  };

  return (
    <Button
      label={isInCart ? "Remove from cart" : "Add to cart"}
      size="medium"
      onClick={handleClick}
    />
  );
};
export default AddToCart;
