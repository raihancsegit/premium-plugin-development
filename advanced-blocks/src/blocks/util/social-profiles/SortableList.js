import React from "react";
import SortableSocialProfile from "./SortableSocialProfile";
import { SortableContainer } from "react-sortable-hoc";

const SortableList = SortableContainer(props => {
  const { profiles, ...rest } = props;

  return (
    <ul>
      {profiles.map((profile, index) => (
        <SortableSocialProfile
          key={`item-${index}`}
          index={index}
          profile={profile}
          {...rest}
        />
      ))}
    </ul>
  );
});

export default SortableList;
