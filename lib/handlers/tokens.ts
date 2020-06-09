import { DataType } from '../../index.d.types';

export function post(data: DataType): string {
  return 'TOKENS POST';
}

export function put(data: DataType): string {
  return 'TOKENS UPDATE';
}

export function eliminate(data: DataType): string {
  return 'TOKENS ELIMINATE';
}

export function get(data: DataType): string {
  return 'TOKENS GET';
}
