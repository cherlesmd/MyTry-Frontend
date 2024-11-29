import { React, useState } from "react";
import AuthContext from "../auth/AuthPovider";
import { useContext } from "react";
import useAxios from "../auth/useAxios";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

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

  const ItinContent = () => {
    return (
      <div>
        <a href="#">Anniversary</a>
        <a href="#">New York Trip</a>
      </div>
    )
  }

  const DropLink = ({ children, href, DropContent }) => {
    const [open, setOpen] = useState(false);
    const showDrop = DropContent && open;

    return (
      <div onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="relative h-fit w-fit">
        <a href={href} className="relative">{children}</a>
        <AnimatePresence>
          {showDrop && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              style={{ translateX: "-50%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute left-1/2 top-12">
              <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
              <div className="absolute left1/2 top- h-4 w-4 
              -translate-x-1/2  rotate-45"/>
              <DropContent />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  };

  return (
    <nav className="h-16 flex gap-10 justify-between mt-1 mb-6 mx-4">
      <div className="flex items-center flex-shrink-0">
        <Link to="/">
          <p>My Try</p>
        </Link>
      </div>
      <div className="flex flex-shrink-0 justify-between md:gap-3 items-center">
        <div className="flex justify-center">
          <DropLink href="#" DropContent={ItinContent}>
            Itineraries
          </DropLink>
        </div>
        <button type="submit" onClick={handleLogout}>
          Sign out
        </button>
      </div>
    </nav>
  );
};
export default Header;
