import axios, { AxiosResponse, AxiosError } from "axios";
import { apiUrl } from "../config";

class ApiError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface Book {
  docs: BookItem[];
  total: number;
  limit: number;
  offset: number;
  page: number;
  pages: number;
}

interface BookItem {
  _id: string;
  name: string;
}

async function getBookData(): Promise<Book> {
  try {
    const resp = await axios.get(`${apiUrl}/book`);
    if (resp.status === 200) {
      return resp.data;
    } else {
      throw new ApiError(`Unexpected status code: ${resp.status}`, resp.status);
    }
  } catch (err) {
    if (typeof err === "object" && err !== null && "response" in err) {
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        throw new ApiError(
          `Unexpected status code: ${axiosError.response.status}`,
          axiosError.response.status
        );
      }
    } else {
      const castedError = err as Error;
      console.log("Axios Error Status:", castedError); // Log for debugging

      throw new ApiError(
        `Failed to retrieve book data: ${castedError.message}`,
        500
      );
    }
  }
  throw new Error("An unexpected error occurred");
}

export { getBookData, ApiError };
