// // Listen for messages from content script

// console.log("entered!")
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     console.log(message.type)
//     console.log("Floppers!")
//     if (message.type === 'explicitImageDetected') {
//         const imageUrl = message.imageUrl;
        
//         // Create a notification to inform the user about the explicit image
//         chrome.notifications.create({
//             type: 'basic',
//             title: 'Explicit Image Detected',
//             message: `An explicit image was detected at ${imageUrl}. Please be cautious.`,
//             requireInteraction: true // Keep the notification visible until dismissed by the user
//         });
//     }
// });
// Send message to background script
chrome.runtime.sendMessage({ type: 'explicitImageDetected', imageUrl: image.src }, response => {
    if (chrome.runtime.lastError) {
        console.error('Error sending message:', chrome.runtime.lastError.message);
    }
});
