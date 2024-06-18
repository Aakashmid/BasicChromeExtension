// background.js

// Function to check if an email is open and retrieve details
function checkEmailStatus(sendResponse) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const tab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          // Function to detect if the current page is Gmail and an email is open
          function isEmailOpen() {
            // Example selector for detecting if an email is open in Gmail
            if(window.location.hostname.includes('mail.google.com')){
                const emailSubjectElement = document.querySelector('h2.hP');
                return !!emailSubjectElement;
            }
            else{
                return false
            }
          }
  
          // Function to get email details
          function getEmailDetails() {
            const emailSubject = document.querySelector('h2.hP')?.innerText || '';
            const emailBody = document.querySelector('div.a3s.aiL')?.innerText || '';
            return { subject: emailSubject, body: emailBody };
          }
  
          // Check if an email is open
          if (isEmailOpen()) {
            const emailDetails = getEmailDetails();
            sendResponse({ success: true, details: emailDetails });
          } else {
            sendResponse({ success: false, error: 'No open email found.' });
          }
        }
      });
    });
  }
  
  // Listen for messages from popup.js
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'generateResponse') {
      // Call function to check email status and retrieve details
      checkEmailStatus(sendResponse);
      return true; // Keep the message channel open for sendResponse
    }
  });
  