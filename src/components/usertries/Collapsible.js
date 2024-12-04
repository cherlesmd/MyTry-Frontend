import { useRef, useState } from "react";
import PropTypes from "prop-types";


const Collapsible = ({ tryName, address, itineraries, deleteTry, addItinerary, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isItinExpanded, setItinIsExpanded] = useState(false);
  const ref = useRef();
  const refItin = useRef();
  const [height, setHeight] = useState();
  const [heightItin, setHeightItin] = useState();

  const handleToggle = (section) => {

    if (section === "address") {
      setIsExpanded(!isExpanded);
      setItinIsExpanded(false);
      setHeight(ref.current.clientHeight);
      setHeightItin(refItin.current.clientHeight);
    }
    else {
      console.log("itin");
      setIsExpanded(false);
      setItinIsExpanded(!isItinExpanded);
      setHeight(ref.current.clientHeight);
      setHeightItin(refItin.current.clientHeight);
    }
  };

  const classes = `try-item ${isExpanded ? "is-expanded" : null} ${isItinExpanded ? "is-expanded" : null}`;
  const currentHeight = isExpanded ? height : 0;
  const currentItinHeight = isItinExpanded ? heightItin : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    addItinerary(e.currentTarget.elements.Itin.value, index)
  }

  return (
    <div className={classes}>
      <div className="flex flex-row justify-between w-full">
        <p>{tryName}</p>

        <div className="card-title hover:font-bold" onClick={() => handleToggle("address")}>
          <p>@</p>
        </div>
        <div className="card-title hover:font-bold" onClick={() => handleToggle("itin")}>
          <p>#</p>
        </div>

        <button
          className="text-accent text-3xl hover:font-bold"
          onClick={() => deleteTry(index)}
        >
          --
        </button>
      </div>

      <div className="card-collapse" style={{ height: currentHeight + "px" }}>

        <div className="card-body text-sm" ref={ref}>
          {address}
        </div>

      </div>
      <div className="card-collapse" style={{ height: currentItinHeight + "px" }}>

        <div className="flex flex-row justify-between card-body text-sm" ref={refItin}>
          {itineraries?.map((item, index) => {
            return (
              <p>{item}</p>
            )
          })}
          <form className="w-28" onSubmit={handleSubmit}>
            <input id="Itin" className="shadow appearance-none border w-full py-1 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Add tag"
              onKeyDown={e =>
                e.key === "Enter" && handleSubmit} />
          </form>
        </div>

      </div>
    </div>
  );
};
Collapsible.propTypes = {
  title: PropTypes.string,
};
export default Collapsible;
