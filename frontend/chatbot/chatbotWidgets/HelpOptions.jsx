import React from "react";
import Widget from "../chatbotWidgets/widgets";

const HelpOptions = (props) => {
  const options = [
    { text: "User Guide", handler: () => props.actionProvider.handleHelpFeature("guide") },
    { text: "FAQs", handler: () => props.actionProvider.handleHelpFeature("faqs") },
    { text: "Contact Us", handler: () => props.actionProvider.handleHelpFeature("contact") }
  ];

  return <Widget title="Help Resources:" options={options} />;
};

export default HelpOptions;
