import { LeftArrow } from "neetoicons";
import { Typography } from "neetoui";
import { keys } from "ramda";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import useCartItemsStore from "stores/useCartItemsStore";

const Header = ({ title, shouldDisplayBackButton = false, searchAction }) => {
  const history = useHistory();

  // const [cartItems] = useContext(CartItemsContext);
  // const cartItemsCount = cartItems.length;

  // const { cartItems } = useCartItemsStore();
  // const cartItemsCount = cartItems.length;

  const cartItemsCount = useCartItemsStore(
    store => keys(store.cartItems).length
  );

  return (
    <>
      <div className="mt-3 flex items-center justify-between ">
        <div className="flex items-center gap-3 p-3">
          {shouldDisplayBackButton && (
            <LeftArrow
              className="cursor-pointer rounded-full"
              onClick={history.goBack}
            />
          )}
          <Typography className="" style="h1" weight="semibold">
            {title}
          </Typography>
        </div>
        <div className="flex items-center space-x-4">
          {!shouldDisplayBackButton && searchAction}
          <div className="relative cursor-pointer">
            {cartItemsCount > 0 && (
              <span className=" absolute -right-2 -top-3 flex h-5 w-5 items-center justify-center  rounded-full border border-black p-1 text-center  font-bold">
                {cartItemsCount}
              </span>
            )}
            <Link to="/cart">
              <AiOutlineShoppingCart className="h-7 w-7" />
            </Link>
          </div>
        </div>
      </div>
      <hr className="border-2 border-black" />
    </>
  );
};

export default Header;
