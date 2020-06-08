export function parseJsonToObject<T>(data: string): T {
  try {
    return JSON.parse(data);
  } catch (e) {
    return e;
  }
}
