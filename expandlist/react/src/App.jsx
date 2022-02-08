import React, { useEffect, useState } from "react";
import MenuList from "./components/MenuList";
import { fetchData } from "./api";

import "./index.css";

const App = () => {
  const [data, setData] = useState([]);
  const [defaultSelectedIds, setDefaultSelectedIds] = useState(["10", "6", "3"]);

  const handleClearDefaultIds = () => {
    setDefaultSelectedIds([]);
  };

  useEffect(() => {
    fetchData().then((data) => setData(data));
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
