// background.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'generateResponse') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        const url = new URL(tab.url);
        console.log('Current tab URL:', url);
  
        // Check if the tab URL is Gmail
        if (url.origin === 'https://mail.google.com') {
          // Send a message to content.js to get email details
          chrome.tabs.sendMessage(tab.id, { action: 'checkEmail' }, (response) => {
            if (chrome.runtime.lastError) {
              console.error('Error sending message to content.js:', chrome.runtime.lastError);
              sendResponse({ success: false, error: 'Failed to send message to content script.' });
            } else {
              sendResponse(response);
            }
          });
        } else {
          sendResponse({ success: false, error: 'This extension only works on Gmail.' });
        }
      });
      return true; // Keep the message channel open for sendResponse
    }
  });
  