export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

// auth types

// for signup
export interface signUpData {
  name: string;
  email: string;
  password: string;
}


export interface signInData {
  email: string;
  password: string;
}