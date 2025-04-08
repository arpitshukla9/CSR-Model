import React from "react";
import Widget from "../chatbotWidgets/widgets";

const InventoryResults = (props) => {
  const { payload } = props;
  const options = payload.slice(0, 3).map(item => ({
    text: `View ${item.name}`,
    handler: () => {
      // This would navigate to the item in your inventory
      props.actionProvider.inventoryRef.current.navigateToItem(item.id);
    }
  }));

  return <Widget title="Search Results:" options={options} />;
};

export default InventoryResults;