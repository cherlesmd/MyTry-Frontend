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

      const response = await axiosPrivate({
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
    <Fragment>
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
            <li key={index} className="h-8 mb-3 pt-1">
              <span>{item.name}</span>
              <button onClick={() => deleteTry(index)}> - </button>
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
};
export default UserTries;
