import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../auth/AuthPovider";
import {
  AddressAutofill,
  useConfirmAddress,
  config,
} from "@mapbox/search-js-react";
import { axiosInstance } from "../../api/axiosConfig";

export default function Search({ feature, setFeature, tries, setTries }) {
  const [showOverlay, setShowOverlay] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const [showFormExpanded, setShowFormExpanded] = useState(false);
  const [showValidationText, setShowValidationText] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    setToken(accessToken);
    config.accessToken = accessToken;
  }, []);

  const newTry = async (name) => {
    try {
      const address = feature.properties.place_name;
      const longitude = feature.geometry.coordinates[0];
      const latitude = feature.geometry.coordinates[1];

      const response = await axiosInstance({
        method: "post",
        url: "/tries",
        params: {
          name,
          address,
          longitude,
          latitude,
        },
      });

      const updatedTries = [...tries, response.data];
      setTries(updatedTries);
    } catch (error) {
      console.log(error);
      if (error.response.status === 403) {
        setAuth(false);
      }
    }
  };

  const { formRef, showConfirm } = useConfirmAddress({
    minimap: true,
    skipConfirmModal: (feature) => {
      ["exact", "high"].includes(feature.properties.match_code.confidence);
    },
  });

  const handleRetrieve = (res) => {
    setFeature(res.features[0]);
    setShowFormExpanded(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    submitForm(e.currentTarget.elements.tryName.value);
  };

  function submitForm(name) {
    newTry(name);
    setShowValidationText(true);
    setTimeout(() => {
      resetForm();
    }, 2500);
  }

  function resetForm() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
    setShowFormExpanded(false);
    setShowValidationText(false);
    setShowOverlay(false);
    setFeature(null);
  }

  return (
    <>
      <div>
        <button
          className="bg-secondary border-[#7b74b3] border-2 py-2 px-5 rounded hover:rounded-3xl duration-300"
          onClick={() => setShowOverlay(true)}
        >
          New Try
        </button>
      </div>
      <div
        className=" z-10 h-auto bg-background max-w-screen-sm"
        style={{ display: showOverlay ? "block" : "none" }}
      >
        <form
          ref={formRef}
          className="shadow-md pt-5 px-7 pb-7 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Address
            </label>
            <AddressAutofill accessToken={token} onRetrieve={handleRetrieve}>
              <input
                className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Start typing address, e.g. 123 Main..."
                autoComplete="address-line1"
                id="mapbox-autofill"
              />
            </AddressAutofill>
            <div style={{ display: showFormExpanded ? "none" : "block" }}>
              <button
                type="button"
                className="mt-5 btn round btn--gray-light ml3"
                id="btn-reset"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </div>
          <div style={{ display: showFormExpanded ? "block" : "none" }}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Try Name"
                id="tryName"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Address Line 2
              </label>
              <input
                className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Apartment, suite, unit, building, floor, etc."
                autoComplete="address-line2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                City
              </label>
              <input
                className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="City"
                autoComplete="address-level2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                State / Region
              </label>
              <input
                className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="State / Region"
                autoComplete="address-level1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                ZIP / Postcode
              </label>
              <input
                className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="ZIP / Postcode"
                autoComplete="postal-code"
              />
            </div>
          </div>

          {showFormExpanded && (
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
                id="btn-confirm"
              >
                Confirm
              </button>
              <button
                type="button"
                className="btn round btn--gray-light ml3"
                id="btn-reset"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          )}
        </form>

        {showValidationText && (
          <div id="validation-msg" className="mt24 txt-m txt-bold">
            Successfully saved
          </div>
        )}
      </div>
    </>
  );
}
