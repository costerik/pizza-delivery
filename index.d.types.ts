import type { IncomingHttpHeaders } from 'http';
export type QueryType = {
  id?: string;
  phone?: string;
};
export type RoutesType = 'users' | 'tokens' | 'items' | 'carts';
export type MethodsType = 'get' | 'put' | 'eliminate' | 'post';
export type MetaDataType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
export type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
};
export type UserMetaType = UserType & MetaDataType;
export type TokensType = {
  userId: string;
  expiration: Date;
};
export type TokensMetaType = TokensType & MetaDataType;
export type CartType = {
  userId: string;
  items: Array<ItemsType>;
};
export type CartMetaType = CartType & MetaDataType;
export type ItemsType = {
  name: string;
  price: number;
  stock: number;
};
export type ItemsMetaType = ItemsType & MetaDataType;
export type DataType<T = UserType | TokensType | CartType | ItemsType> = {
  headers: IncomingHttpHeaders;
  trimmedPath: string;
  method: string | undefined;
  payload: T;
  query: QueryType;
};
