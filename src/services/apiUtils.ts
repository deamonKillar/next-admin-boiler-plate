import axios, { AxiosRequestConfig } from "axios";
import authConfig from "@/configs/auth";
import navItems from "@/layouts/components/navigation/navItems";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define the Token type
interface Token {
  Authorization: string;
}

// Function to check and logout
const checkAndLogout = (error: any) => {
  if (error.response.status && error.response.status === 401) {
    window.localStorage.clear();
  } else {
    throw new Error(error);
  }
};

// Function to get the token
const getToken = (): Token | null => {
  const accessTokenValue =
    typeof window !== "undefined"
      ? window.localStorage.getItem(authConfig.storageTokenKeyName)
      : null;
  const tokenLoading = accessTokenValue === null;
  return tokenLoading ? null : { Authorization: `Bearer ${accessTokenValue}` };
};

// Function to handle API request errors
const handleRequestError = (err: any) => {
  checkAndLogout(err);
};

// Generic function for making HTTP requests
const sendRequest = async <T>(
  method: string,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const token = getToken();
    const headers =
      url !== "http://138.68.129.51:8000/auth/login" && token
        ? { ...config?.headers, ...token }
        : { ...config?.headers };
    const _navItems: any = navItems();
    const _url = url.split("/");

    _navItems.map((value: any) => {
      if (value.subject === _url[3]) {
        const remainingStrings = _url.slice(4);
        // Join the remaining strings with a space
        const joinedString = remainingStrings.join("/");
        // url = `http://localhost:${value.port}/api/${value.subject}/${joinedString}`
        url = `http://138.68.129.51:${value.port}/api/${value.subject}/${joinedString}`;
      }
    });
    const response = await axios.request<T>({
      method,
      url,
      data,
      ...config,
      headers: headers,
    });

    return response.data;
  } catch (err: any) {
    toast.error(`${err?.response?.data?.message}`, {
      autoClose: 4000,
    });

    handleRequestError(err);
    throw err;
  }
};

// Specific HTTP methods
export const sendGETRequest = <T>(url: string, config?: AxiosRequestConfig) =>
  sendRequest<T>("get", url, undefined, config);
export const sendPOSTRequest = <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => sendRequest<T>("post", url, data, config);
export const sendPUTRequest = <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => sendRequest<T>("put", url, data, config);
export const sendPATCHRequest = <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => sendRequest<T>("patch", url, data, config);
export const sendDELETERequest = <T>(
  url: string,
  config?: AxiosRequestConfig
) => sendRequest<T>("delete", url, undefined, config);
export const sendMultiDELETERequest = <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => sendRequest<T>("delete", url, data, config);
