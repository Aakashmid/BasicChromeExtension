// popup.js

document.addEventListener('DOMContentLoaded', function () {
  const generateResponseButton = document.getElementById('generateResponseButton');

  generateResponseButton.addEventListener('click', function () {
    console.log('Generate Response button clicked');
    chrome.runtime.sendMessage({ action: 'generateResponse' }, function (response) {
      console.log('Response received in popup.js:', response);
      if (response && response.success) {
        const { subject, body } = response.details;
        document.getElementById('response').innerText = `Subject: ${subject}\n\nBody: ${body}`;
      } else if (response && !response.success) {
        document.getElementById('response').innerText = response.error || 'No open email found.';
      } else {
        document.getElementById('response').innerText = 'No response generated.';
      }
    });
  });
});
