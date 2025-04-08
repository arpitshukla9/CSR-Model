import React from "react";
import Widget from "../chatbotWidgets/widgets";

const DefaultOptions = (props) => {
  const options = [
    { text: "Inventory", handler: () => props.actionProvider.handleInventoryQuestions() },
    { text: "Tracking", handler: () => props.actionProvider.handleTrackingQuestions() },
    { text: "Account Help", handler: () => props.actionProvider.handleAccountQuestions() },
    { text: "Pricing", handler: () => props.actionProvider.handlePricingQuestions() },
    { text: "Features", handler: () => props.actionProvider.handleFeaturesQuestions() }
  ];

  return <Widget title="How can I help you?" options={options} />;
};

export default DefaultOptions;
