export type useFetchResponse<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};


export type FetchOptions = {
  method?: string;
  headers?: { [key: string]: string };
  body?: BodyInit;
};
