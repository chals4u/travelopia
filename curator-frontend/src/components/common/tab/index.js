// import { useState } from "react";

export const NormalTabs = (props) => {
  // const [activeIndex, setActiveIndex] = useState(0);

  let { data = [], onChange = () => {} } = props;

  const handleTabChange = (i) => {
    // setActiveIndex(i);
    onChange(i);
  };

  return (
    <>
      <ul
        className="d-flex justify-content-between mb-25 nav nav-pills"
        id="curator-tab"
        role="tablist"
      >
        {data?.map((data, index) => (
          <li className="nav-item" role="presentation" key={index}>
            <button
              className={`lato-semi-bold-white-14px fw-700 nav-link ${
                props.index === index && "active"
              }`}
              onClick={() => handleTabChange(index)}
              type="button"
              role="tab"
            >
              {data}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
