import React from "react";
import PropTypes from "prop-types";

const TrashIcon = ({ profileName, onDeleteProfile }) => (
  <span
    className="fa fa-trash eb-delete-social"
    style={trashStyle}
    onClick={() => onDeleteProfile(profileName)}
  />
);

const trashStyle = {
  fontSize: 14,
  borderLeft: "1px solid gray",
  lineHeight: "2.5em",
  flex: 2,
  textAlign: "center"
};

TrashIcon.propTypes = {
  profileName: PropTypes.string.isRequired,
  onDeleteProfile: PropTypes.func.isRequired
};

export default TrashIcon;
