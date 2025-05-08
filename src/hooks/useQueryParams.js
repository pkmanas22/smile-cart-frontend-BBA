import { keysToCamelCase } from "neetocist";
import { parse } from "qs";
import { useLocation } from "react-router-dom";

const useQueryParams = () => {
  const location = useLocation();

  // parse() -> convert string to object
  const queryParams = parse(location.search, {
    ignoreQueryPrefix: true, // ignore leading question mark
  });

  return keysToCamelCase(queryParams);
};

export default useQueryParams;
