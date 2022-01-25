import React from "react";
import PropTypes from "prop-types";

import "./TabContent.css";

const TabContent = (props) => {
  return <div className={`tabcontent ${props.isActive ? "active" : ""}`}>{props.children}</div>;
};

TabContent.propTypes = {
  isActive: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default TabContent;
