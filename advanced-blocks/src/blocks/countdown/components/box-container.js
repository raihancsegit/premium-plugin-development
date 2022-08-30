import React from "react";

const BoxContainer = ({ boxContainerStyle, children }) => (
  <div className="eb-countdown-wrapper">
    <div className="eb-countdown-container">
      <ul className="eb-countdown-items" style={boxContainerStyle}>
        {children}
      </ul>
    </div>
  </div>
);

export default BoxContainer;
