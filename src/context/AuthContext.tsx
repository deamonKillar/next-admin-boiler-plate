// ** React Imports
import { ReactNode, createContext, useEffect, useState } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Config
import authConfig from "@/configs/auth";

// ** Types

import { AuthValuesType, LoginParams, UserDataType } from "./types";

// import { toast } from 'react-hot-toast'
// import "react-toastify/dist/ReactToastify.css";
import AuthApi from "@/services/authApis";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
let moduleArray: any = [];

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: false,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};
const AuthContext = createContext(defaultProvider);
type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);
  // ** Hooks
  const router = useRouter();

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(
        authConfig.storageTokenKeyName
      )!;
      const userData = JSON.parse(
        window.localStorage.getItem(authConfig.storageUserDataKeyName)!
      );
      const timeStamp = JSON.parse(
        window.localStorage.getItem(authConfig.timestampKeyName)!
      );
      const refreshToken = window.localStorage.getItem(
        authConfig.refreshTokenKeyName
      );
      const currentTimeStamp = JSON.stringify(new Date().getTime());

      if (storedToken && userData) {
        moduleArray = userData?.modulesPermission;
        if (router.pathname == "/") {
          router.push("/dashboard");
        }
        setLoading(true);

        setLoading(false);

        setUser(userData);
        if (currentTimeStamp > timeStamp) {
          await axios
            .get(`http://138.68.129.51:8000/api/Auth/refresh-token`, {
              headers: {
                refreshToken: `${refreshToken}`,
              },
            })
            .then((response) => {
              const token = response.data.result.accessToken;
              window.localStorage.setItem(
                authConfig.storageTokenKeyName,
                token
              );
              window.localStorage.setItem(
                authConfig.timestampKeyName,
                JSON.stringify(new Date().getTime() + 1000)
              );
            })
            .catch((error) => {
              console.log("refresh token error", error);
            });
        }
      } else {
        handleLogout();
      }
    };
    initAuth();
  }, []);

  const handleLogin = async (params: LoginParams) => {
    await AuthApi.login(params)
      .then((response: any) => {
        if (response.statusCode === 200 && response.result) {
          const user = response?.result;
          moduleArray = user?.modulesPermission;
          window.localStorage.setItem(
            authConfig.storageTokenKeyName,
            user.accessToken
          );
          window.localStorage.setItem(
            authConfig.timestampKeyName,
            JSON.stringify(new Date().getTime() + 600000)
          );
          window.localStorage.setItem(
            authConfig.refreshTokenKeyName,
            user.refreshToken
          );
          setUser({ ...user });
          window.localStorage.setItem(
            authConfig.storageUserDataKeyName,
            JSON.stringify(user)
          );
          router.push("/dashboard");
        }
      })
      .catch((error: any) => {
        toast.error(`${error?.response?.data?.message}`, {
          autoClose: 4000,
        });
        setLoading(false);
        handleLogout();
      });
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.clear();
    setLoading(false);
    router.push("/auth/login ");
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider, moduleArray };
