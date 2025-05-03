import { keysToSnakeCase } from "neetocist";
import { stringify } from "qs";
import { toPairs, omit, pipe, isEmpty } from "ramda";

// route = "/products/:slug"
// {slug: "cotton-shirt"}
export const buildUrl = (route, params) => {
  const placeholders = [];
  toPairs(params).forEach(([key, value]) => {
    if (route.includes(`:${key}`)) {
      placeholders.push(key);
      route = route.replace(`:${key}`, encodeURIComponent(value));
    }
  });

  const queryParams = pipe(
    omit(placeholders),
    keysToSnakeCase,
    stringify
  )(params);

  return isEmpty(queryParams) ? route : `${route}?${queryParams}`;
};
