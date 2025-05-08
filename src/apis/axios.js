import axios from "axios";
import { t } from "i18next";
import { keysToCamelCase, serializeKeysToSnakeCase } from "neetocist";
import { Toastr } from "neetoui";
import { evolve } from "ramda";

const shouldShowToastr = response =>
  typeof response === "object" && response?.noticeCode;

const showSuccessToastr = response => {
  if (shouldShowToastr(response)) Toastr.success(response.data);
};

const showErrorToastr = error => {
  if (error.message === t("error.networkError")) {
    Toastr.error(t("error.noInternetConnection"));
  } else if (error.response?.status !== 404) {
    Toastr.error(error);
  }
};

const transformKeysToCamelCase = response => {
  if (response.data) response.data = keysToCamelCase(response.data);
};

const responseInterceptors = () => {
  axios.interceptors.response.use(
    response => {
      transformKeysToCamelCase(response);
      showSuccessToastr(response);

      return response.data;
    },
    error => {
      showErrorToastr(error);

      return Promise.reject(error);
    }
  );
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
