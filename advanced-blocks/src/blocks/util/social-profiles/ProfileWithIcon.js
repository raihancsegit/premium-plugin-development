import PropTypes from "prop-types";
import "./style.scss";

const ProfileWithIcon = ({ icon, onProfileClick }) => (
  <span className="profile-icon-container" onClick={() => onProfileClick(icon)}>
    <span className={`fa fa-${icon}`} />
    <span className="selected-profile-icon">{icon}</span>
  </span>
);

ProfileWithIcon.prototype = {
  icon: PropTypes.string.isRequired,
  onProfileClick: PropTypes.func.isRequired
};

export default ProfileWithIcon;
