import { useState, useEffect } from "react";
import Header from "../header/Header";
import DistanceButton from "../button/DistanceButton";
import MainLayout from "../MainLayout";
import { Routes, Route } from "react-router-dom";
import useAxios from "../auth/useAxios";

const Dash = () => {
  const [tries, setTries] = useState([]);
  const [error, setError] = useState("");
  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);
  const [distance, setDistance] = useState("0");
  const axiosPrivate = useAxios();

  useEffect(() => {
    const fetchLocation = () => {
      if (!navigator.geolocation) {
        setError("Browser does not support geolocation");
        return;
      }

      navigator.geolocation.getCurrentPosition(success, error);

      function success(position) {
        setLng(position.coords.longitude);
        setLat(position.coords.latitude);
      }

      function error() {
        setError("Unable to retrieve current location");
      }
    };

    fetchLocation();
  }, []);

  const getTries = async (dist) => {
    try {
      console.log(lng, lat, dist);
      const response = await axiosPrivate({
        method: "get",
        url: "/tries",
        params: { longitude: lng, latitude: lat, distance: parseInt(dist) },
      });
      setTries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDistance = (data) => {
    setDistance(data);
    getTries(data);
  };

  return distance === "0" ? (
    <div className="box-border text-center">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<DistanceButton getDistance={getDistance} />}
        />
      </Routes>
    </div>
  ) : (
    <div className="box-border text-center">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout
              tries={tries}
              setTries={setTries}
              getDistance={getDistance}
              lng={lng}
              setLng={setLng}
              lat={lat}
              setLat={setLat}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default Dash;
