// content.js

function isEmailOpen() {
    const emailSubjectElement = document.querySelector('h2.hP');
    console.log('Email subject element found:', emailSubjectElement);
    return !!emailSubjectElement;
  }
  
  function getEmailDetails() {
    const emailSubject = document.querySelector('h2.hP')?.innerText || '';
    const emailBody = document.querySelector('div.a3s.aiL')?.innerText || '';
    console.log('Email details found:', { subject: emailSubject, body: emailBody });
    return { subject: emailSubject, body: emailBody };
  }
  
  // Listen for messages from background.js
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Received message in content.js:', request);
    if (request.action === 'checkEmail') {
      if (isEmailOpen()) {
        const emailDetails = getEmailDetails();
        sendResponse({ success: true, details: emailDetails });
      } else {
        sendResponse({ success: false, error: 'No open email found.' });
      }
    }
  });
  