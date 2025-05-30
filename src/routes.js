const routes = {
  root: "/",
  products: {
    index: "/products",
    show: "/products/:slug", //  we should not store the template string `/products/${slug} here`
  },
  cart: "/cart",
  checkout: "/checkout",
};

export default routes;
