import { useRef, useState } from "react";
import PropTypes from "prop-types";

const Collapsible = ({ tryName, address, deleteTry, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef();
  const [height, setHeight] = useState();
  const handleToggle = (e) => {
    setIsExpanded(!isExpanded);
    setHeight(ref.current.clientHeight);
  };
  const classes = `try-item ${isExpanded ? "is-expanded" : null}`;
  const currentHeight = isExpanded ? height : 0;

  return (
    <div className={classes}>
      <div className="flex flex-row justify-between w-full">
        <p>{tryName}</p>
        <div className="card-title hover:font-bold" onClick={handleToggle}>
          <p>@</p>
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
    </div>
  );
};
Collapsible.propTypes = {
  title: PropTypes.string,
};
export default Collapsible;
