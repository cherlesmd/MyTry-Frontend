import { Fragment } from "react";
import useAxios from "../auth/useAxios";
import DistanceButton from "../button/DistanceButton";
import Search from "../search/Search";

const UserTries = ({ tries, setTries, getDistance, feature, setFeature }) => {
  const axiosPrivate = useAxios();

  const deleteTry = async (index) => {
    console.log(tries[index].location.x);

    try {
      const name = tries[index].name;
      const longitude = tries[index].location.x;
      const latitude = tries[index].location.y;

      await axiosPrivate({
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
      console.log(error);
    }
  };

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
        {tries?.map((item, index) => {
          return (
            <li key={index} className="pt-3 mb-3 flex justify-between">
              <span className="pr-2">{item.name}</span>
              <button
                className="text-red-500 text-2xl"
                onClick={() => deleteTry(index)}
              >
                {" "}
                --{" "}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default UserTries;
