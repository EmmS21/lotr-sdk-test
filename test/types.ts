interface BookApiResponse {
  docs: {
    _id: string;
    name: string;
  }[];
  total: number;
  limit: number;
  offset: number;
  page: number;
  pages: number;
}

export { BookApiResponse };
