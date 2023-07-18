import React from "react";
import FadeLoader from "react-spinners/FadeLoader";

const Spinner = () => {
  return (
    <div className=" d-flex sweet-loading  justify-content-center">
      <FadeLoader color={"#d3d3d3"} />
    </div>
  );
};

export default Spinner;
