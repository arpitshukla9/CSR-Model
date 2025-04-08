import React from "react";

const Widget = ({ title, options }) => (
  <div className="options-container">
    <h4 className="options-header">{title}</h4>
    <div className="options-list">
      {options.map((option, index) => (
        <button key={index} className="option-button" onClick={option.handler}>
          {option.text}
        </button>
      ))}
    </div>
  </div>
);

export default Widget;
