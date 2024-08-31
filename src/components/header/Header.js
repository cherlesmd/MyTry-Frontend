import React from "react";
import AuthContext from "../auth/AuthPovider";
import { useContext } from "react";
import useAxios from "../auth/useAxios";
import { Link } from "react-router-dom";

const Header = () => {
  const { setAuth } = useContext(AuthContext);
  const axiosPrivate = useAxios();

  const handleLogout = async () => {
    await axiosPrivate({
      method: "post",
      url: "/auth/logout",
    });
    window.localStorage.clear();
    setAuth({});
  };

  return (
    <nav className="h-16 flex gap-10 justify-between mt-1 mb-6 mx-4">
      <div className="flex items-center flex-shrink-0">
        <Link to="/">
          <p>My Try</p>
        </Link>
      </div>
      <div className="flex flex-shrink-0 justify-between md:gap-3 items-center">
        <button type="submit" onClick={handleLogout}>
          Sign out
        </button>
      </div>
    </nav>
  );
};
export default Header;
