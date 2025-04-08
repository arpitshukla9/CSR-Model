import { createChatBotMessage } from 'react-chatbot-kit';
import InventoryOptions from "../chatbot/chatbotWidgets/InventoryWidgets";
import TrackingOptions from "../chatbot/chatbotWidgets/TrackingOption";
import AccountOptions from "../chatbot/chatbotWidgets/AccountOptions";
import PricingOptions from "../chatbot/chatbotWidgets/PricingOptions";
import HelpOptions from "../chatbot/chatbotWidgets/HelpOptions";
import FeaturesOptions from "../chatbot/chatbotWidgets/FeaturesOptions";
import DefaultOptions from "../chatbot/chatbotWidgets/DefaultOptions";



const config = {
  initialMessages: [
    createChatBotMessage("Hi there! I'm GoodVentory's virtual assistant. How can I help you today?", {
      widget: 'defaultOptions',
    }),
  ],
  botName: "GoodVentory Assistant",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#376B7E",
    },
  },
  widgets: [
    {
      widgetName: 'inventoryOptions',
      widgetFunc: (props) => <InventoryOptions {...props} />,
    },
    {
      widgetName: 'trackingOptions',
      widgetFunc: (props) => <TrackingOptions {...props} />,
    },
    {
      widgetName: 'accountOptions',
      widgetFunc: (props) => <AccountOptions {...props} />,
    },
    {
      widgetName: 'pricingOptions',
      widgetFunc: (props) => <PricingOptions {...props} />,
    },
    {
      widgetName: 'helpOptions',
      widgetFunc: (props) => <HelpOptions {...props} />,
    },
    {
      widgetName: 'featuresOptions',
      widgetFunc: (props) => <FeaturesOptions {...props} />,
    },
    {
      widgetName: 'defaultOptions',
      widgetFunc: (props) => <DefaultOptions {...props} />,
    },
  ],
};

export default config;