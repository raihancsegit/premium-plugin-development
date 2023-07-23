import React, { Component } from "react";
import SortableList from "./SortableList";

const SortableComponent = ({ profiles, onSortEnd, ...rest }) => {
  if (profiles.length === 0) return <ul />;

  return (
    <SortableList
      profiles={profiles}
      useDragHandle={true}
      onSortEnd={onSortEnd}
      {...rest}
    />
  );
};

export default SortableComponent;
