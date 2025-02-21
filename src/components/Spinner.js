import React from "react";
import Hourglass from "./Hourglass.gif"; // Ensure this file is present in the same directory

const Spinner = () => {
  return (
    <div className="text-center my-5">
      <img
        src={Hourglass}
        alt="Loading..."
        style={{ width: "50px", height: "50px" }}
      />
    </div>
  );
};

export default Spinner;
