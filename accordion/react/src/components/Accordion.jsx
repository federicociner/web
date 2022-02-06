import React from "react";
import AccordionItem from "./AccordionItem";

import "./Accordion.css";

const Accordion = (props) => {
  const data = [
    {
      title: "Section 1",
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente laborum cupiditate possimus labore, hic temporibus velit dicta earum suscipit commodi eum enim atque at? Et perspiciatis dolore iure voluptatem.",
    },
    {
      title: "Section 2",
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente laborum cupiditate possimus labore, hic temporibus velit dicta earum suscipit commodi eum enim atque at? Et perspiciatis dolore iure voluptatem.",
    },
    {
      title: "Section 3",
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente laborum cupiditate possimus labore, hic temporibus velit dicta earum suscipit commodi eum enim atque at? Et perspiciatis dolore iure voluptatem.",
    },
  ];
  return (
    <div className="accordion">
      {data.map((item, index) => (
        <AccordionItem key={index} content={item.content} title={item.title} />
      ))}
    </div>
  );
};

export default Accordion;
