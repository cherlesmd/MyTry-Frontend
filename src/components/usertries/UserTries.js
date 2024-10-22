import { Fragment, useState } from "react";
import { axiosInstance } from "../../api/axiosConfig";
import useAxios from "../auth/useAxios";
import DistanceButton from "../button/DistanceButton";
import Search from "../search/Search";
import Collapsible from "./Collapsible";

const UserTries = ({ tries, setTries, getDistance, feature, setFeature }) => {
  const axiosPrivate = useAxios();

  const deleteTry = async (index) => {
    console.log(tries[index].location.x);

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
        <div className="pt-8">
          {tries?.map((item, index) => {
            return (
              <li key={index} className="pt-4 mb-3 w-full">
                <Collapsible
                  tryName={item.name}
                  address={item.address}
                  deleteTry={deleteTry}
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
