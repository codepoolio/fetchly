## Fetchly: An Axios Wrapper for Mocha Testing

Fetchly is a lightweight Axios wrapper designed to simplify HTTP requests in Mocha tests by returning all responses in a standardized object format. This library helps to avoid exceptions and improves test clarity by encapsulating success and error responses, making it easier for QA engineers and developers to handle HTTP interactions in automated tests.

### Key Features:
- Standardized Responses: Fetchly ensures all HTTP responses, including errors, are returned in a consistent object structure, eliminating the need for try-catch blocks in your tests.
- Support for All HTTP Methods: Out-of-the-box support for GET, POST, PUT, PATCH, DELETE, and custom HTTP methods like COPY.
- Automatic Cookie Handling: Easily manage cookies with configuration options for credentials.
- Extensible and Configurable: Customize request and response behaviors with Axios interceptors, automatic retries, and detailed logging.
- Integration Ready: Ideal for use in Mocha tests but flexible enough for any Node.js application requiring robust HTTP request handling.

### Installation:
```bash
npm install codepool-fetchly
```

### Usage:
```javascript
import Fetchly from 'codepool-fetchly';

const fetchly = new Fetchly({ baseURL: 'https://api.example.com', withCredentials: true });

fetchly.get('/endpoint')
.then(response => console.log(response))
.catch(error => console.error(error));
```

### Why Fetchly?
Simplify your Mocha tests and streamline HTTP request handling with Fetchly’s clean, consistent approach to managing API responses. Whether dealing with simple requests or complex, stateful interactions, Fetchly provides the tools to keep your tests clear, concise, and error-free.