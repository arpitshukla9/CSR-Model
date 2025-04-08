

import React from 'react';

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, inventoryRef) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.inventoryRef = inventoryRef;
  }

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };

  handleGreeting = () => {
    const message = this.createChatBotMessage('Hello! How can I help you with GoodVentory today?');
    this.addMessageToState(message);
  };

  handleInventoryQuestions = () => {
    const message = this.createChatBotMessage(
      'GoodVentory offers a robust inventory management system. You can track stock levels, set automatic reorder points, categorize items, and generate reports. Would you like to know more about any specific inventory feature?',
      {
        widget: 'inventoryOptions',
      }
    );
    this.addMessageToState(message);
  };

  handleTrackingQuestions = () => {
    const message = this.createChatBotMessage(
      'Our tracking system allows you to monitor shipments in real-time, set delivery notifications, and integrate with major shipping carriers. Is there something specific about tracking you\'d like to know?',
      {
        widget: 'trackingOptions',
      }
    );
    this.addMessageToState(message);
  };

  handleAccountQuestions = () => {
    const message = this.createChatBotMessage(
      'You can create a GoodVentory account by clicking the "Sign Up" button at the top of the page. If you already have an account, click "Log in". Need help with your existing account?',
      {
        widget: 'accountOptions',
      }
    );
    this.addMessageToState(message);
  };

  handlePricingQuestions = () => {
    const message = this.createChatBotMessage(
      'GoodVentory offers flexible pricing plans to suit businesses of all sizes. We have Basic, Professional, and Enterprise tiers. You can view detailed pricing on our Pricing page. Would you like me to tell you about a specific plan?',
      {
        widget: 'pricingOptions',
      }
    );
    this.addMessageToState(message);
  };

  handleHelpRequest = () => {
    const message = this.createChatBotMessage(
      'I\'m here to help! You can ask me about inventory management, tracking, account issues, pricing, or features. For more personalized assistance, you can also contact our support team at support@goodventory.com.',
      {
        widget: 'helpOptions',
      }
    );
    this.addMessageToState(message);
  };

  handleFeaturesQuestions = () => {
    const message = this.createChatBotMessage(
      'GoodVentory includes features like inventory tracking, real-time analytics, barcode scanning, multi-location management, and integration with e-commerce platforms. What specific feature would you like to learn more about?',
      {
        widget: 'featuresOptions',
      }
    );
    this.addMessageToState(message);
  };

  handleThanks = () => {
    const message = this.createChatBotMessage('You\'re welcome! Is there anything else I can help you with today?');
    this.addMessageToState(message);
  };







  handleInventoryLookup = (query) => {
    if (!this.inventoryRef.current) {
      const message = this.createChatBotMessage("I can't access the inventory right now. Please try again later.");
      this.addMessageToState(message);
      return;
    }

    const inventory = this.inventoryRef.current.getInventory();
    const filtered = inventory.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) || 
      item.sku.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length === 0) {
      const message = this.createChatBotMessage(`No items found matching "${query}". Would you like to try a different search?`);
      this.addMessageToState(message);
    } else {
      let response = `I found ${filtered.length} item(s):\n`;
      filtered.slice(0, 3).forEach(item => {
        response += `- ${item.name} (SKU: ${item.sku}), Qty: ${item.quantity}\n`;
      });
      
      if (filtered.length > 3) {
        response += `...and ${filtered.length - 3} more items.`;
      }

      const message = this.createChatBotMessage(response, {
        widget: 'inventoryResults',
        payload: filtered
      });
      this.addMessageToState(message);
    }
  };

  handleLowStockAlert = () => {
    if (!this.inventoryRef.current) {
      const message = this.createChatBotMessage("I can't check stock levels right now.");
      this.addMessageToState(message);
      return;
    }

    const inventory = this.inventoryRef.current.getInventory();
    const lowStock = inventory.filter(item => item.quantity < 5);

    if (lowStock.length === 0) {
      const message = this.createChatBotMessage("All items have sufficient stock levels!");
      this.addMessageToState(message);
    } else {
      let response = `You have ${lowStock.length} item(s) with low stock:\n`;
      lowStock.forEach(item => {
        response += `- ${item.name} (SKU: ${item.sku}), Current Qty: ${item.quantity}\n`;
      });

      const message = this.createChatBotMessage(response);
      this.addMessageToState(message);
    }
  };

  // Add this to your existing handleDefault method
  handleDefault = () => {
    const message = this.createChatBotMessage(
      "I'm not sure I understand. You can ask about inventory levels, low stock alerts, or say 'help' for more options.",
      {
        widget: 'defaultOptions',
      }
    );
    this.addMessageToState(message);
  };
}

export default ActionProvider;