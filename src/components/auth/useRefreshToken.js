import AuthContext from "../auth/AuthPovider";
import {axiosInstance} from "../../api/axiosConfig";
import { useContext } from "react";

const useRefreshToken = () => {
    const { auth, setAuth } = useContext(AuthContext);

    const refresh = async () => {
        const response = await axiosInstance({method: "post", url: "/auth/refresh-token", 
            headers: { "Authorization": `Bearer: ${auth.refreshToken}` },
        });

        setAuth((prev) => {
            return { ...prev, accessToken: response.data.accessToken };
        });
        return response.data.accessToken;
    };

    return refresh;
};

export default useRefreshToken;
