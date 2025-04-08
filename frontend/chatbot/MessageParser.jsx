import React from 'react';

class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();
    
    // Handle greetings
    if (lowerCaseMessage.includes('hello') || 
        lowerCaseMessage.includes('hi') || 
        lowerCaseMessage.includes('hey')) {
      this.actionProvider.handleGreeting();
      return;
    }
    
    // Handle inventory related questions
    if (lowerCaseMessage.includes('inventory') || 
        lowerCaseMessage.includes('stock') || 
        lowerCaseMessage.includes('items')) {
      this.actionProvider.handleInventoryQuestions();
      return;
    }
    
    // Handle tracking related questions
    if (lowerCaseMessage.includes('track') || 
        lowerCaseMessage.includes('shipping') || 
        lowerCaseMessage.includes('delivery')) {
      this.actionProvider.handleTrackingQuestions();
      return;
    }
    
    // Handle account related questions
    if (lowerCaseMessage.includes('account') || 
        lowerCaseMessage.includes('login') || 
        lowerCaseMessage.includes('signup') || 
        lowerCaseMessage.includes('register')) {
      this.actionProvider.handleAccountQuestions();
      return;
    }
    
    // Handle pricing related questions
    if (lowerCaseMessage.includes('price') || 
        lowerCaseMessage.includes('cost') || 
        lowerCaseMessage.includes('subscription') ||
        lowerCaseMessage.includes('plan')) {
      this.actionProvider.handlePricingQuestions();
      return;
    }
    
    // Handle help request
    if (lowerCaseMessage.includes('help') || 
        lowerCaseMessage.includes('support') || 
        lowerCaseMessage.includes('assistance')) {
      this.actionProvider.handleHelpRequest();
      return;
    }
    
    // Handle features questions
    if (lowerCaseMessage.includes('feature') || 
        lowerCaseMessage.includes('capability') || 
        lowerCaseMessage.includes('can you') ||
        lowerCaseMessage.includes('what do you do')) {
      this.actionProvider.handleFeaturesQuestions();
      return;
    }
    
    // Handle thanks
    if (lowerCaseMessage.includes('thank') || 
        lowerCaseMessage.includes('appreciate') || 
        lowerCaseMessage.includes('great')) {
      this.actionProvider.handleThanks();
      return;
    }
    
    // Default fallback for unrecognized queries
    this.actionProvider.handleDefault();
  }
}

export default MessageParser;