import React from "react";
import PropTypes from "prop-types";

import "./Tab.css";

const Tab = (props) => {
  return (
    <div className="tab">
      {props.tabs.map((tab, index) => (
        <button
          className={props.activeTab === index ? "active" : ""}
          key={index}
          onClick={(e) => {
            e.preventDefault();
            props.handleClick(index);
          }}>
          {tab.title}
        </button>
      ))}
    </div>
  );
};

Tab.propTypes = {
  activeTab: PropTypes.number,
  handleClick: PropTypes.func,
  tabs: PropTypes.arrayOf(PropTypes.object),
};

export default Tab;
