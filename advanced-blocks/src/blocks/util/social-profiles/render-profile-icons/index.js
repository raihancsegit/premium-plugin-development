import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

const RenderProfileIcons = ({
  profileStyles,
  profiles,
  customColor,
  hoverAnimation
}) => {
  const { container, iconWrapper, iconStyle } = profileStyles;

  // Generates class names for profile icons
  const generateCssClassNames = icon => {
    // Show original icons if custom color is false
    const colorClass = !customColor ? `${icon}-original` : "";
    const hoverClass = hoverAnimation ? `hvr-${hoverAnimation}` : "";

    return `${colorClass} ${hoverClass}`;
  };

  return (
    <div className="profile-container" style={container}>
      {profiles.map(profile => (
        <a
          className={`profile-icon-wrapper ${generateCssClassNames(
            profile.icon
          )}`}
          href={profile.link}
          style={iconWrapper}
        >
          <i
            className={`profile-icon fa fa-${profile.icon}`}
            style={iconStyle}
            data-icon={profile.icon}
          />
        </a>
      ))}
    </div>
  );
};

RenderProfileIcons.propTypes = {
  profileStyles: PropTypes.shape({
    container: PropTypes.object.isRequired,
    iconWrapper: PropTypes.object.isRequired,
    iconStyle: PropTypes.object.isRequired
  }),
  profiles: PropTypes.array.isRequired,
  customColor: PropTypes.bool,
  hoverAnimation: PropTypes.string
};

export default RenderProfileIcons;
