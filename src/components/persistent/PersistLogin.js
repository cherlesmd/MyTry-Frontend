import { Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import useRefreshToken from "../auth/useRefreshToken";
import AuthContext from "../auth/AuthPovider";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, setAuth, persist } = useContext(AuthContext);

    useEffect(() => {
        let isMounted = true;

        /*const verifyRefreshToken = async () => {
                  try {
                    await refresh();
                  } catch (err) {
                    console.error(err);
                  } finally {
                    isMounted && setIsLoading(false);
                  }
                };*/
        const addAuth = () => {
            setAuth(localStorage.getItem("accessToken"));
            isMounted && setIsLoading(false);
        };

        !auth?.accessToken && persist ? addAuth() : setIsLoading(false);

        return () => (isMounted = false);
    }, []);

    return (
        <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
    );
};

export default PersistLogin;
