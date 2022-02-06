import React, { useState } from "react";
import PropTypes from "prop-types";

import "./AccordionItem.css";

const AccordionItem = (props) => {
  const { content, title } = props;
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={handleClick}>
        <div>{title}</div>
        <div>{isActive ? "-" : "+"}</div>
      </div>
      {isActive && <div className="accordion-content">{content}</div>}
    </div>
  );
};

AccordionItem.propTypes = {
  content: PropTypes.string,
  title: PropTypes.string,
};

export default AccordionItem;
