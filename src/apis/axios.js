import axios from "axios";
import { keysToCamelCase, serializeKeysToSnakeCase } from "neetocist";
import { evolve } from "ramda";

const transformKeysToCamelCase = response => {
  if (response.data) response.data = keysToCamelCase(response.data);
};

const responseInterceptors = () => {
  axios.interceptors.response.use(response => {
    transformKeysToCamelCase(response);

    return response.data;
  });
};

const requestInterceptors = () => {
  // axios.interceptors.request.use(request =>
  //   evolve(
  //     { data: serializeKeysToSnakeCase, params: serializeKeysToSnakeCase },
  //     request
  //   )
  // );

  // All lambda functions are curried by default. So we don't need to explicitly pass request argument to the evolve function.
  axios.interceptors.request.use(
    evolve({ data: serializeKeysToSnakeCase, params: serializeKeysToSnakeCase })
  );
};

const setHttpHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

const initializeAxios = () => {
  axios.defaults.baseURL =
    "https://smile-cart-backend-staging.neetodeployapp.com/";
  setHttpHeaders();
  responseInterceptors();
  requestInterceptors();
};

export default initializeAxios;
