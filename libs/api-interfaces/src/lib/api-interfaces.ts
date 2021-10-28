export interface IMessage {
  message: string;
}
export interface IUser {
  _id: string
  username: string
  password?: string
  name: string
  age: number,
  token?: string
  currency: CURRENCIES
  equity: number
}
export enum CURRENCIES {
  DOLLAR,
  EURO
}