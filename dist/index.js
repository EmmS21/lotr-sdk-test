"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const book_1 = require("./api/book");
async function main() {
    try {
        const bookData = await (0, book_1.getBookData)();
        console.log("Book data:", bookData);
    }
    catch (error) {
        if (error instanceof book_1.ApiError) {
            console.error("API Error:", error.message);
            console.error("API Status:", error.status);
        }
        else {
            console.error("Error", error.message);
        }
    }
}
main();
