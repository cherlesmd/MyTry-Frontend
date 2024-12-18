import Map from "./map/Map";
import React, { useState } from "react";
import UserTries from "./usertries/UserTries";

const MainLayout = ({
  tries,
  setTries,
  getDistance,
  lng,
  setLng,
  lat,
  setLat,
}) => {
  const [feature, setFeature] = useState();
  return (
    <main className="font-inter grid grid-cols-1 gap-28 lg:grid-cols-2 mx-auto px-8 lg:px-36 pt-8 h-svh lg:h-[80svh]">
      <UserTries
        tries={tries}
        setTries={setTries}
        getDistance={getDistance}
        feature={feature}
        setFeature={setFeature}
      ></UserTries>
      <Map
        lng={lng}
        setLng={setLng}
        lat={lat}
        setLat={setLat}
        tries={tries}
      ></Map>
    </main>
  );
};
export default MainLayout;
