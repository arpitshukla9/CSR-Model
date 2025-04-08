import React from "react";
import Widget from "../chatbotWidgets/widgets";

const AccountOptions = (props) => {
  const options = [
    { text: "Password Reset", handler: () => props.actionProvider.handleAccountFeature("password") },
    { text: "Account Settings", handler: () => props.actionProvider.handleAccountFeature("settings") },
    { text: "Contact Support", handler: () => props.actionProvider.handleAccountFeature("support") }
  ];

  return <Widget title="Account Help:" options={options} />;
};

export default AccountOptions;
