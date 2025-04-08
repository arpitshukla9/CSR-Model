import React from "react";
import Widget from "../chatbotWidgets/widgets";

const FeaturesOptions = (props) => {
  const options = [
    { text: "Inventory Management", handler: () => props.actionProvider.handleFeatureCategory("inventory") },
    { text: "Order Processing", handler: () => props.actionProvider.handleFeatureCategory("orders") },
    { text: "Analytics & Reporting", handler: () => props.actionProvider.handleFeatureCategory("analytics") },
    { text: "Integrations", handler: () => props.actionProvider.handleFeatureCategory("integrations") }
  ];

  return <Widget title="Feature Categories:" options={options} />;
};

export default FeaturesOptions;
