## TypeScript SDK for Lord of the Rings API /book endpoint

This TypeScript SDK provides a streamlines option to interact with the /book endpoint in the Lord of the Rings API, enabling you to retrieve all books related to the Lord of the Rings series.

# Installation

To install this SDK follow this process:
`npm install lordoftheringsSDK`

# Getting Started

Once you have completed the install process, to get started and interact with the SDK follow this process

1. Import the SDK function you need
   `import { getBookData } from 'lordofringssdk'`;

2. Use the imported function to retrieve all books in the Lord of the Rings series

Example Usage:

```
    const bookData = await getBookData();
    console.log('Book data:', bookData);
```

# API Reference

`getBookData()`

This function retrieves all book data from the /book endpoint in the Lord of the Rings API. The function returns a promise that resolves to the book data as a JSON

Example Usage:

```
    import { getBookData } from 'my-book-sdk';
    const bookData = await getBookData();
```

# Error Handling

Errors in the SDK are handled as followsL

- If an `ApiError` is thrown, this means there was an issue with the API request. This will be shown through the status and error message.

- If a generic error, that is not `ApiError`, is thrown, this means there was a non-API related issue, likely a network error. You can handle these errors separately.

Example Usage:

```
    try {
        const bookData = await getBookData();
    } catch (error) {
        if (error instanceof ApiError) {
            console.error('API Error:', error.message);
            console.error('API Status:', error.status);
        } else {
            console.error('Generic Error', (error as Error).message);
        }
    }
```

# Testing

In order to run tests for the SDK, usin a testing framework like Jest. Refer to the `book.test.ts` file in the `test` directory for some example tests.

# Configuration

The SDK is preconfigured with the API URL defined in the `config.ts` file. You can customize the API URL by modifying the `apiUrl` constant in the file mentioned.

Example Usage:

```
    // config.ts
    export const apiUrl = "http://127.0.0.1:8000;

```
