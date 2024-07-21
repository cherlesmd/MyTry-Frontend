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
    <main className="grid grid-cols-1 gap-28 lg:grid-cols-2 mx-auto px-36 pt-8 h-[80svh]">
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
