import React from "react";
import { SortableHandle } from "react-sortable-hoc";

const DragHandle = SortableHandle(() => (
  <span className="fa fa-ellipsis-v drag-handle" />
));

export default DragHandle;
