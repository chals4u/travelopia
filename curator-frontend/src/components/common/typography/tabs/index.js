/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./tabs.scss";

export const NormalTabs = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  let {
    className = "",
    data = [],
    onChange = () => {},
  } = props;

  const handleTabChange = (i) => {
    setActiveIndex(i);
    onChange(i);
  };

  return (
    <ul className={`nav custom-tab ${className} mb-3`}>
      <ul
        className="nav nav-pills mb-25"
        id="create-patient-tab"
        role="tablist"
      >
        {data?.map((data, index) => (
          <li className="nav-item" role="presentation" key={index}>
            <button
              className={`nav-link ${props.index === index && "active"}`}
              onClick={() => handleTabChange(index)}
              type="button"
            >
              {data}
            </button>
          </li>
        ))}
      </ul>
    </ul>
  );
};
