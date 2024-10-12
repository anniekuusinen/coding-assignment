export interface User {
  id?: number;
  name: string;
  email: string;
  phone: number;
  website: string;
  address: Address;
}
export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}
export interface FilterData {
  searchTerm: string;
}
