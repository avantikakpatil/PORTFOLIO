// Initialize SmoothScroll for smooth scrolling
var scroll = new SmoothScroll('a[href*="#"]');

// Function to display a notification
function displayNotification(title, message) {
  const notificationPanel = document.getElementById('notification-content');
  notificationPanel.innerHTML = `
    <h4>${title}</h4>
    <p>${message}</p>
  `;
  const panel = document.getElementById('notification-panel');
  panel.style.display = 'block';
  setTimeout(() => {
    panel.style.display = 'none';
  }, 5000); // Hide the notification after 5 seconds
}

// Event listener to toggle the notification panel
document.getElementById('notification-icon').addEventListener('click', function() {
  const panel = document.getElementById('notification-panel');
  panel.style.display = (panel.style.display === 'none' || panel.style.display === '') ? 'block' : 'none';
});

// Event listener to manually trigger a test notification
document.getElementById('test-notification-button').addEventListener('click', function() {
  displayNotification('Test Notification', 'This is a test message.');
});

// Trigger a test notification automatically after 3 seconds (for testing purposes)
setTimeout(function() {
  displayNotification('Test Notification', 'This is a test message.');
}, 3000);

// Initialize SuprSend
function initSuprSend() {
  if (typeof suprsend === 'undefined') {
    console.error('SuprSend SDK is not loaded');
    return;
  }

  suprsend.init({
    apiKey: 'SS.WjS2C6I0uCtzrZ0x0txeaoy8P3x6YfxwJrByu26dMvQ', // Replace with your SuprSend API key
    onNotification: function(notification) {
      displayNotification(notification.title, notification.message);
    }
  });

  const targetElem = document.getElementById("suprsend-inbox");
  const config = window.suprSendConfig || {};
  initSuprSendInbox(targetElem, config);
}

document.addEventListener('DOMContentLoaded', (event) => {
  initSuprSend();
});

function initSuprSend() {
  if (typeof suprsend === 'undefined') {
    console.error('SuprSend SDK is not loaded');
    return;
  }

  const workspaceKey = 'wJNNId8VAQSTVZsABUnE';  // Replace with your actual workspace key
  const distinctId = 'Avanti';      // Replace with the user's unique identifier (e.g., user ID)
  const subscriberId = 'Avanti123';  // Replace with the subscriber's ID

  suprsend.init({
    apiKey: workspaceKey,
    onNotification: function(notification) {
      displayNotification(notification.title, notification.message);
    }
  });

  const targetElem = document.getElementById("suprsend-inbox");
  const config = {
    workspaceKey: workspaceKey,
    distinctId: distinctId,
    subscriberId: subscriberId,
    themeType: "dark", // Customize as needed
    theme: {
      bell: { color: "blue" },
      badge: { backgroundColor: "red", color: "black" }
    }
  };

  initSuprSendInbox(targetElem, config);
}

function initSuprSendInbox(targetElem, config) {
  if (!targetElem || !config.workspaceKey || !config.distinctId || !config.subscriberId) {
    console.error('SuprSend configuration is incomplete.');
    return;
  }

  suprsend.renderInbox({
    targetElem,
    workspaceKey: config.workspaceKey,
    distinctId: config.distinctId,
    subscriberId: config.subscriberId,
    themeType: config.themeType,
    theme: config.theme
    // Add other configurations as needed
  });
}
