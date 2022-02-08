import React, { useState } from "react";
import PropTypes from "prop-types";

const iconTypes = {
  downArrow: "▼",
  rightArrow: "▶",
  noChildren: "•",
};

const MenuList = ({ data = [], defaultSelectedIds, handleClearDefaultIds }) => {
  return (
    <ul>
      {data.map((item, index) => {
        return (
          <MenuItem
            id={item.id}
            key={index}
            name={item.name}
            childs={item.children}
            defaultSelectedIds={defaultSelectedIds}
            handleClearDefaultIds={handleClearDefaultIds}
          />
        );
      })}
    </ul>
  );
};

const MenuItem = (props) => {
  const { id, name, childs, defaultSelectedIds, handleClearDefaultIds } = props;
  const isDefaultSelected = defaultSelectedIds ? defaultSelectedIds.includes(id) : false;
  const [isExpanded, setIsExpanded] = useState(isDefaultSelected);

  let iconType = iconTypes.noChildren;
  if (childs && childs.length) {
    iconType = isExpanded ? iconTypes.downArrow : iconTypes.rightArrow;
  }

  const handleClick = (e) => {
    e.stopPropagation();
    if (childs && childs.length && e.target.className === "icon") {
      setIsExpanded(!isExpanded);
    }

    if (defaultSelectedIds) {
      handleClearDefaultIds();
    }
  };

  const handleKeyPress = (e) => {
    e.stopPropagation();
    if (e.which === 13) {
      setIsExpanded(!isExpanded);
    }

    if (defaultSelectedIds) {
      handleClearDefaultIds();
    }
  };

  return (
    <li role="option" tabIndex={0} aria-selected={isExpanded} onClick={handleClick} onKeyPress={handleKeyPress}>
      <span className="icon">{iconType}</span>
      <span>{name}</span>
      {isExpanded && (
        <MenuList
          className="menu-list"
          data={childs}
          defaultSelectedIds={defaultSelectedIds}
          handleClearDefaultIds={handleClearDefaultIds}
        />
      )}
    </li>
  );
};

MenuList.propTypes = {
  data: PropTypes.array,
  defaultSelectedIds: PropTypes.array,
  handleClearDefaultIds: PropTypes.func,
};

MenuItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  childs: PropTypes.array,
  defaultSelectedIds: PropTypes.array,
  handleClearDefaultIds: PropTypes.func,
};

export default MenuList;
