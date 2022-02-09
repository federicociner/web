import React, { useEffect, useState } from "react";
import MenuList from "./components/MenuList";
import { fetchData } from "./api";

import "./index.css";

const App = () => {
  const [data, setData] = useState([]);
  const [defaultSelectedIds, setDefaultSelectedIds] = useState([]);

  const handleClearDefaultIds = () => {
    setDefaultSelectedIds([]);
  };

  const traversePages = (data, parentId) => {
    var result = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].active) {
        result.push(data[i].id);
      }

      if (data[i].children) {
        result = result.concat(traversePages(data[i].children, data[i].id));
      }
    }

    // Add parent IDs
    if (parentId && data) {
      if (data.filter((item) => item.active).length > 0 || data.some((item) => result.includes(item.id))) {
        result.push(parentId);
      }
    }

    return result;
  };

  useEffect(() => {
    fetchData()
      .then((data) => {
        setData(data);
        setDefaultSelectedIds(traversePages(data));
      })
      .catch((_) => console.error("Data could not load!"));
  }, []);

  return (
    <div className="container">
      <h1>Expandable Table</h1>
      <h2>{new Date().toLocaleString()}</h2>
      <MenuList data={data} defaultSelectedIds={defaultSelectedIds} handleClearDefaultIds={handleClearDefaultIds} />
    </div>
  );
};

export default App;
