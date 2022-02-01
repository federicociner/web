import React from "react";
import PropTypes from "prop-types";

import "./DragAndDrop.css";

const DragAndDrop = (props) => {
  const { data, dispatch } = props;
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_DROP_DEPTH", dropDepth: data.dropDepth + 1 });
  };

  const handleDragLeave = (e) => {
    console.log("drag leave");
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_DROP_DEPTH", dropDepth: data.dropDepth - 1 });
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let files = [...e.dataTransfer.files];

    if (files && files.length > 0) {
      const existingFiles = data.fileList.map((f) => f.name);
      files = files.filter((f) => !existingFiles.includes(f.name));

      dispatch({ type: "ADD_FILE_TO_LIST", files });
      e.dataTransfer.clearData();
      dispatch({ type: "SET_DROP_DEPTH", dropDepth: 0 });
      dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
    }
  };

  return (
    <div
      className={data.inDropZone ? "drag-drop-zone inside-drag-area" : "drag-drop-zone"}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}>
      Drag files here to upload
    </div>
  );
};

DragAndDrop.propTypes = {
  data: PropTypes.shape({
    dropDepth: PropTypes.number,
    inDropZone: PropTypes.bool,
    fileList: PropTypes.array,
  }),
  dispatch: PropTypes.func,
};

export default DragAndDrop;
