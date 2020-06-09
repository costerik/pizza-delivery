import { DataType, UserType } from '../../index.d.types';

export function post(
  data: DataType
): {
  statusCode: number;
  response?: {
    error: string;
  };
} {
  const {
    payload: { firstName, lastName, email, address },
  } = data as DataType<UserType>;

  const user: Partial<UserType> = {};
  if (typeof firstName === 'string' && firstName.trim().length) {
    user.firstName = firstName;
  } else {
    return { statusCode: 400, response: { error: 'missing required field: firstName' } };
  }
  if (typeof lastName === 'string' && lastName.trim().length && lastName) {
    user.lastName = lastName;
  } else {
    return { statusCode: 400, response: { error: 'missing required field: lastName' } };
  }
  if (typeof email === 'string' && email.trim().length === 10) {
    user.email = email;
  } else {
    return { statusCode: 400, response: { error: 'missing required field: email' } };
  }
  if (typeof address === 'string' && address.trim().length) {
    user.address = address;
  } else {
    return { statusCode: 400, response: { error: 'missing required field: address' } };
  }
  return { statusCode: 200 };
}

export function put(data: DataType): string {
  return 'USER UPDATE';
}

export function eliminate(data: DataType): string {
  return 'USER ELIMINATE';
}

export function get(data: DataType): string {
  return 'USER GET';
}
