import { useContext } from "react";
import { axiosInstance } from "../../api/axiosConfig";
import AuthContext from "../auth/AuthPovider";
import DistanceButton from "../button/DistanceButton";
import Search from "../search/Search";
import Collapsible from "./Collapsible";

const UserTries = ({ tries, setTries, getDistance, feature, setFeature }) => {

  const { setAuth } = useContext(AuthContext);

  console.log(tries);
  const deleteTry = async (index) => {

    try {
      const name = tries[index].name;
      const longitude = tries[index].location.x;
      const latitude = tries[index].location.y;

      await axiosInstance({
        method: "delete",
        url: "/tries",
        params: {
          name,
          longitude,
          latitude,
        },
      });

      const updatedTries = tries.filter((_, i) => i !== index);
      setTries(updatedTries);
    } catch (error) {
      if (error.response.status === 403) {
        setAuth(false);
      }
      console.log(error);
    }
  };

  const newItinerary = async (itinerary, name, index) => {
    try {
      await axiosInstance({
        method: "post",
        url: `/tries/${itinerary}/${name}`,
      });

      const updatedTryItins = [...tries];
      updatedTryItins[index] = { ...updatedTryItins[index], itineraries: [...updatedTryItins[index].itineraries, itinerary] }
      setTries(updatedTryItins);

    } catch (error) {
      if (error.response.status === 403) {
        setAuth(false);
      }
      console.log("Failed to add");
    }
  }



  return (
    <div className="">
      <ul>
        <Search
          feature={feature}
          setFeature={setFeature}
          tries={tries}
          setTries={setTries}
        ></Search>
        <DistanceButton getDistance={getDistance}></DistanceButton>
        <div className="pt-8">
          {tries?.map((item, index) => {
            return (
              <li key={index} className="pt-4 mb-3 w-full">
                <Collapsible
                  tryName={item.name}
                  address={item.address}
                  itineraries={item.itineraries}
                  deleteTry={deleteTry}
                  addItinerary={newItinerary}
                  index={index}
                />
              </li>
            );
          })}
        </div>
      </ul>
    </div>
  );
};
export default UserTries;
