import { useEffect } from "react";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
import api from "../../api";

const useAxios = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const authInterceptor = api.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${auth?.accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error?.config;

        if (
          error.response.status === 403 &&
          error.response.data.message === "Unauthorized"
        ) {
          const accessToken = refresh();
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          originalRequest._retry = true;
          return api(originalRequest);
        }

        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.request.ejec(refreshInterceptor);
      api.interceptors.response.eject(authInterceptor);
    };
  }, [auth, refresh]);
};

export default useAxios;
