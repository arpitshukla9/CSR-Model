import React from "react";
import Widget from "../chatbotWidgets/widgets";

const InventoryOptions = (props) => {
  const options = [
    { text: "Stock Management", handler: () => props.actionProvider.handleInventoryFeature("stock") },
    { text: "Barcode Scanning", handler: () => props.actionProvider.handleInventoryFeature("barcode") },
    { text: "Reporting", handler: () => props.actionProvider.handleInventoryFeature("reports") }
  ];

  return <Widget title="Inventory Features:" options={options} />;
};

export default InventoryOptions;
