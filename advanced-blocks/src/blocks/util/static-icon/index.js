import React from "react";
import PropTypes from "prop-types";
const { BaseControl } = wp.components;

export const StaticIcon = ({ id, label, icon }) => (
  <BaseControl label={label} id={id}>
    <span className={`fa fa-${icon}`} id={id} style={{ fontSize: 24 }} />
  </BaseControl>
);

PropTypes.StaticIcon = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  icon: PropTypes.string,
};
