import React from "react";
import PropTypes from "prop-types";
import { SortableElement } from "react-sortable-hoc";
import ProfileWithIcon from "./ProfileWithIcon";
import TrashIcon from "./TrashIcon";
import LinkForm from "./LinkForm";
import DragHandle from "./DragHandle";

const SortableSocialProfile = ({
  profile,
  onProfileClick,
  onDeleteProfile,
  selectedIcon,
  url,
  onUrlChange,
  onSubmit
}) => (
  <li className="drag-helper">
    <span className="profile-wrapper">
      <DragHandle />
      <ProfileWithIcon icon={profile.icon} onProfileClick={onProfileClick} />
      <TrashIcon profileName={profile.icon} onDeleteProfile={onDeleteProfile} />
    </span>

    {selectedIcon === profile.icon &&
      profile.isExpanded && (
        <LinkForm
          icon={profile.icon}
          url={url}
          onUrlChange={onUrlChange}
          onSubmit={onSubmit}
        />
      )}
  </li>
);

SortableSocialProfile.propTypes = {
  profile: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    link: PropTypes.string,
    isExpanded: PropTypes.bool.isRequired
  }),
  onProfileClick: PropTypes.func.isRequired,
  onDeleteProfile: PropTypes.func.isRequired,
  url: PropTypes.string,
  onUrlChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default SortableElement(SortableSocialProfile);
