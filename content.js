// Function to check if an image is explicit by making a request to the FastAPI endpoint
async function isExplicitImage(imageUrl) {
    try {
        const response = await fetch('http://127.0.0.1:8000/predict/', {
            method: 'POST',
            body: JSON.stringify({ imageUrl }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data.message === 'Highly Dangerous!' || data.message === 'Dangerous!' || data.message === 'Explicit cartoon!';
    } catch (error) {
        console.error('Error checking image:', error);
        return false; // Return false if there's an error
    }
}


// // Function to handle DOM changes
// function handleDomChanges() {
//     // Select all images on the page
//     const images = document.querySelectorAll('img');
    
//     // Loop through each image
//     images.forEach(image => {
//         // Check if the image is new (not processed before)
//         if (!image.dataset.processed) {
//             // Mark the image as processed to avoid duplicate processing
//             image.dataset.processed = true;
            
//             // Check if the image is explicit
//             if (isExplicitImage(image.src)) {
//                 chrome.runtime.sendMessage({ type: 'explicitImageDetected', imageUrl: image.src });
//             }
//         }
//     });
// }

async function handleDomChanges() {
    // Select all images on the page
    const images = document.querySelectorAll('img');
    
    // Loop through each image
    for (const image of images) {
        // Check if the image is new (not processed before)
        if (!image.dataset.processed) {
            // Mark the image as processed to avoid duplicate processing
            image.dataset.processed = true;
            
            // Check if the image is explicit
            const isExplicit = await isExplicitImage(imageUrl);
            if (isExplicit) {
                chrome.runtime.sendMessage({ type: 'explicitImageDetected', imageUrl: image.src });
            }
        }
    }
}


// Listen for DOM changes
const observer = new MutationObserver(handleDomChanges);
observer.observe(document.body, { childList: true, subtree: true });
