import React, { useState } from "react";
import Tab from "./components/Tab";
import TabContent from "./components/TabContent";

import "./index.css";

function App() {
  const tabs = [
    { id: "first-tab", title: "First", content: "Hello! This is the first tab." },
    { id: "second-tab", title: "Second", content: "Bonjour! This is the second tab." },
    { id: "third-tab", title: "Third", content: "Hola! This is the third tab." },
    { id: "fourth-tab", title: "Fourth", content: "Gutentag! This is the fourth tab." },
  ];
  const [activeTab, setActiveTab] = useState(0);

  const handleClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <div className="App">
      <div className="container">
        <Tab activeTab={activeTab} handleClick={handleClick} tabs={tabs} />
        {tabs.map((tab, index) => (
          <TabContent key={index} id={tab.id} isActive={activeTab === index}>
            {tab.content}
          </TabContent>
        ))}
      </div>
    </div>
  );
}

export default App;
