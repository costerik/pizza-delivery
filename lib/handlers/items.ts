import { DataType } from '../../index.d.types';

export function post(data: DataType): string {
  return 'ITEMS POST';
}

export function put(data: DataType): string {
  return 'ITEMS UPDATE';
}

export function eliminate(data: DataType): string {
  return 'ITEMS ELIMINATE';
}

export function get(data: DataType): string {
  return 'ITEMS GET';
}
