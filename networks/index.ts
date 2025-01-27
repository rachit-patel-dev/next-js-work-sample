import axios from "axios";

export const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT || "";

const axiosInstance = axios.create({
  baseURL,
});

function setAuthToken(token = "") {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
}
const methods = {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
  setAuthToken,
};

export default methods;
