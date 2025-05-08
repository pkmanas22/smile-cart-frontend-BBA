import { QUERY_KEYS } from "constants/query";

import countriesApi from "apis/countries";
import stateApi from "apis/states";
import { prop } from "ramda";
import { useQuery } from "react-query";

export const useFetchCountries = () =>
  useQuery({
    queryKey: QUERY_KEYS.COUNTRIES,
    queryFn: () => countriesApi.fetch(),
    select: prop("countries"),
    staleTime: Infinity,
  });

export const useFetchStates = stateParams =>
  useQuery({
    queryKey: QUERY_KEYS.STATES,
    queryFn: () => stateApi.fetch(stateParams),
    select: prop("states"),
    staleTime: Infinity,
  });
