// import { useState } from "react";

import Cart from "components/Cart";
import Checkout from "components/Checkout";
import PageNotFound from "components/common/PageNotFound";
import Product from "components/Product";
import ProductList from "components/ProductList";
import { Route, Switch, Redirect } from "react-router-dom";
import routes from "routes";

// import CartItemsContext from "./contexts/CartItemsContext";

const App = () => (
  // const [cartItems, setCartItems] = useState([]);

  <>
    {/* <CartItemsContext.Provider value={[cartItems, setCartItems]}> */}
    {/* <div className="flex space-x-2">
            <NavLink exact activeClassName="underline font-bold" to="/">
              Home
            </NavLink>
            <NavLink exact activeClassName="underline font-bold" to="/product">
              Product
            </NavLink>
          </div> */}
    <Switch>
      <Route exact component={Cart} path={routes.cart} />
      <Route exact component={Checkout} path={routes.checkout} />
      <Route exact component={Product} path={routes.products.show} />
      <Route exact component={ProductList} path={routes.products.index} />
      <Redirect exact from={routes.root} to={routes.products.index} />
      <Route component={PageNotFound} path="*" /> {/* for all routes*/}
    </Switch>
    {/* </CartItemsContext.Provider> */}
  </>
);
export default App;
