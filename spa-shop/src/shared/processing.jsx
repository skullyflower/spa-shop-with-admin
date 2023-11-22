import React from "react";

const Processing = ({ inprog = true }) => {
  return (
    <div
      id="processing"
      className={inprog ? "" : "hidden"}>
      <div id="processInner"></div>
    </div>
  );
};
export default Processing;
