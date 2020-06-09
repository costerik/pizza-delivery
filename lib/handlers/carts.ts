import { DataType } from '../../index.d.types';

export function post(data: DataType): string {
  return 'CARTS POST';
}

export function put(data: DataType): string {
  return 'CARTS UPDATE';
}

export function eliminate(data: DataType): string {
  return 'CARTS ELIMINATE';
}

export function get(data: DataType): string {
  return 'CARTS GET';
}
