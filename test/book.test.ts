import axios, { AxiosResponse, AxiosError, Axios } from "axios";
import { getBookData, ApiError } from "../src/api/book";
import { BookApiResponse } from "./types";

jest.mock("axios");

const mockedResponse: AxiosResponse<BookApiResponse> = {
  status: 200,
  statusText: "OK",
  headers: {},
  config: {},
  data: {
    docs: [{ _id: "1", name: "Book 1" }],
    total: 1,
    limit: 10,
    offset: 0,
    page: 1,
    pages: 1,
  },
} as AxiosResponse<BookApiResponse>;

describe("getBookData", () => {
  it("retrieves book data successfully", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(
      mockedResponse
    );
    try {
      const bookData = await getBookData();
      expect(bookData.docs).toHaveLength(1);
      expect(bookData.docs[0].name).toBe("Book 1");
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
    }
  });
  it("handles API errors gracefully", async () => {
    const mockedError: AxiosError = {
      response: {
        status: 404,
        data: { detail: "Not found" },
        statusText: "Not Found",
        headers: {},
        config: {},
      },
      name: "AxiosError",
      message: "Request failed with status code 404",
      isAxiosError: true,
    } as AxiosError;
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(
      mockedError
    );
    try {
      await getBookData();
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect((error as ApiError).message).toBe("Unexpected status code: 404");
      expect((error as ApiError).status).toBe(404);
    }
  });
  it("handles network error gracefully", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(
      new Error("Network error")
    );
    try {
      await getBookData();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe(
        "Failed to retrieve book data: Network error"
      );
    }
  });
});
