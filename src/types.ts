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

export type Order = {
  id: number;
  fullName: string;
  city: string;
  country: string;
  region: string;
  streetAddress: string;
  buildingNumber: string;
  floorNumber: string;
  apartmentNumber: string;
  phoneNumber: string;
  notes: string;
};

export type Product = {
  id: number;
  name: string;
};
