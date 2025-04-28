import PageNotFound from "components/PageNotFound";
import Product from "components/Product";
import ProductList from "components/ProductList";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";

const App = () => (
  <>
    <div className="flex space-x-2">
      <NavLink exact activeClassName="underline font-bold" to="/">
        Home
      </NavLink>
      <NavLink exact activeClassName="underline font-bold" to="/product">
        Product
      </NavLink>
    </div>
    <Switch>
      <Route exact component={ProductList} path="/products" />
      <Route exact component={Product} path="/products/:slug" />
      <Redirect exact from="/" to="/products" />
      <Route component={PageNotFound} path="*" /> {/* for all routes*/}
    </Switch>
  </>
);

export default App;
