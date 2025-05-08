import axios from "axios";

const fetch = params => axios.get("states", { params });

const stateApi = { fetch };

export default stateApi;
