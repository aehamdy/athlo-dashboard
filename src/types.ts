export type ApiResponse<T> = {
  succeeded: boolean;
  message?: string;
  data: T;
};

export type Brand = {
  id: number;
  name: string;
};

export type Category = {
  id: number;
  name: string;
};
