import Home from "components/Home";
import PageNotFound from "components/PageNotFound";
import Product from "components/Product";
import { Route, Switch, NavLink } from "react-router-dom";

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
      <Route exact component={Home} path="/" />
      <Route exact component={Product} path="/product" />
      <Route component={PageNotFound} path="*" /> {/* for all routes*/}
    </Switch>
  </>
);

export default App;
