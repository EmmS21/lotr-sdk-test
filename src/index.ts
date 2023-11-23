import { getBookData, ApiError } from "./api/book";

async function main() {
  try {
    const bookData = await getBookData();
    console.log("Book data:", bookData);
  } catch (error) {
    if (error instanceof ApiError) {
      console.error("API Error:", error.message);
      console.error("API Status:", error.status);
    } else {
      console.error("Error", (error as Error).message);
    }
  }
}

main();
