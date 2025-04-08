import React from "react";
import Widget from "../chatbotWidgets/widgets";

const PricingOptions = (props) => {
  const options = [
    { text: "Basic Plan", handler: () => props.actionProvider.handlePricingFeature("basic") },
    { text: "Professional Plan", handler: () => props.actionProvider.handlePricingFeature("professional") },
    { text: "Enterprise Plan", handler: () => props.actionProvider.handlePricingFeature("enterprise") }
  ];

  return <Widget title="Pricing Plans:" options={options} />;
};

export default PricingOptions;
