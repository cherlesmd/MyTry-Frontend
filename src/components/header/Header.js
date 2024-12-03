import { React, useState } from "react";
import AuthContext from "../auth/AuthPovider";
import { useContext } from "react";
import { axiosInstance } from "../../api/axiosConfig";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
  const { setAuth } = useContext(AuthContext);
  const [Itineraries, setItineraries] = useState(JSON.parse(localStorage.getItem("Itins") || []));

  const handleLogout = async () => {
    await axiosInstance({
      method: "post",
      url: "/auth/logout",
    });
    window.localStorage.clear();
    setAuth(false);
  };

  const newItinerary = async (itinerary) => {
    try {
      await axiosInstance({
        method: "post",
        url: "/user",
        params: {
          itinerary
        },
      });

      const updatedItins = [...Itineraries, itinerary];
      localStorage.setItem("Itins", JSON.stringify(updatedItins))
      setItineraries(updatedItins);

    } catch (error) {
      if (error.response.status === 403) {
        setAuth(false);
      }
      console.log("Failed to add");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    newItinerary(e.currentTarget.elements.Itin.value)
  }

  const ItinContent = () => {
    return (
      <div className="">
        {Itineraries?.map((item, index) => {
          return (
            <li key={index}>
              <a href="#">{item}</a>
            </li>
          );
        })}
        <form onSubmit={handleSubmit}>
          <input id="Itin" className="shadow appearance-none border  w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="new Itinerary"
            onKeyDown={e =>
              e.key === "Enter" && handleSubmit} />
        </form>
      </div>
    )
  }

  const DropLink = ({ children, href }) => {
    const [open, setOpen] = useState(false);
    const showDrop = ItinContent && open;

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
              <div className="absolute left1/2 top- h-4 w-4 z-1
              -translate-x-1/2  rotate-45"/>
              <ItinContent />
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
          <DropLink href="#" >
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
