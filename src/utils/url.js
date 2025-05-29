import { keysToSnakeCase } from "neetocist";
import { stringify } from "qs";
import { toPairs, omit, pipe, isEmpty } from "ramda";

/* const route = "https://courses.bigbinaryacademy.com/:course";
  const params = {
    course: "learn-react",
    name: "ma nas",
    age: 21,
    userId: 35,
  }; */

export const buildUrl = (route, params) => {
  /*
   * convert to key-value pairs of params & go through each pair
   * if the route contains the key, that means, that is parameter for dynamic routing
   * then replace that key with actual value
   * add that key to a array for omitting it later
   * create a new object by omitting that key - use omit() from lambda
   * convert to snake cases - use keysToSnakeCase() from neetocist
   * convert to string - use stringify() from qs, stringify() returns a string which is separated by ampersand (&)
   * for write in one line - use pipe() from lambda, pipe(...)(obj)
   * return the updated url according to query params
   */
  const placeholders = [];
  toPairs(params).forEach(([key, value]) => {
    if (route.includes(`:${key}`)) {
      placeholders.push(key);
      route = route.replace(`:${key}`, encodeURIComponent(value));
    }
  });

  /*
  console.log(placeholders); // [ 'course' ]

  const queries = omit(placeholders, params); // { name: 'ma nas', age: 21, userId: 35 }

  const snakeCaseParams = keysToSnakeCase(queries); // { name: 'ma nas', age: 21, user_id: 35 }

  const stringified = stringify(snakeCaseParams); // 'name=ma%20nas&age=21&user_id=35'

  'https://courses.bigbinaryacademy.com/learn-react?search=ma%20nas&age=21&user_id=35'
  */

  const queryParams = pipe(
    omit(placeholders),
    keysToSnakeCase,
    stringify
  )(params);

  return isEmpty(queryParams) ? route : `${route}?${queryParams}`;
};
