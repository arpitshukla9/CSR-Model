import React from "react";
import Widget from "../chatbotWidgets/widgets";

const TrackingOptions = (props) => {
  const options = [
    { text: "Real-time Tracking", handler: () => props.actionProvider.handleTrackingFeature("realtime") },
    { text: "Shipping Carriers", handler: () => props.actionProvider.handleTrackingFeature("carriers") },
    { text: "Notifications", handler: () => props.actionProvider.handleTrackingFeature("notifications") }
  ];

  return <Widget title="Tracking Features:" options={options} />;
};

export default TrackingOptions;
