import { useContext } from "react";

import { Button } from "neetoui";
import { without } from "ramda";
import CartItemsContext from "src/contexts/CartItemsContext";

const AddToCart = ({ slug }) => {
  const [cartItems, setCartItems] = useContext(CartItemsContext);

  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    setCartItems(prevItems =>
      prevItems.includes(slug)
        ? without([slug], cartItems)
        : [...prevItems, slug]
    );
  };

  return (
    <Button
      label={cartItems.includes(slug) ? "Remove from cart" : "Add to cart"}
      size="medium"
      onClick={handleClick}
    />
  );
};
export default AddToCart;
