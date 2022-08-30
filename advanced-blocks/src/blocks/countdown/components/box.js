import React from "react";

const Box = ({
  boxName,
  boxStyle,
  boxItemStyle,
  label,
  digit,
  digitStyle,
  labelStyle
}) => (
  <li className="eb-countdown-item" style={boxStyle}>
    <div className={`eb-countdown-${boxName}`} style={boxItemStyle}>
      <span
        className={`eb-countdown-digits eb-countdown-digits-${boxName}`}
        style={digitStyle}
      >
        {digit}
      </span>
      <span className="eb-countdown-label" style={labelStyle}>
        {label}
      </span>
    </div>
  </li>
);

export default Box;
