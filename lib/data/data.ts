/*
 * Data Managing
 *
 */

/*Dependencies*/
import { promises as fs } from 'fs';
import path from 'path';
import { parseJsonToObject } from '../helpers';

const baseDir = path.join(__dirname, '/../../.data/');
console.log(baseDir);

export async function create<T>(
  dir: string,
  file: string,
  data: T
): Promise<{ result: boolean; error?: NodeJS.ErrnoException }> {
  let filehandle = null;
  try {
    filehandle = await fs.open(`${baseDir}${dir}/${file}.json`, 'wx');
    const dataStringified = JSON.stringify(data);
    await fs.writeFile(filehandle, dataStringified);
    return { result: true };
  } catch (e) {
    return {
      result: false,
      error: e,
    };
  } finally {
    if (filehandle) {
      await filehandle.close();
    }
  }
}

export async function read<T = { [key: string]: string }>(
  dir: string,
  file: string
): Promise<{
  result: boolean;
  error?: NodeJS.ErrnoException | SyntaxError;
  response?: string | T;
}> {
  try {
    const response = await fs.readFile(`${baseDir}${dir}/${file}.json`, 'utf8');
    return {
      result: true,
      response: parseJsonToObject<T>(response),
    };
  } catch (e) {
    return {
      result: false,
      error: e,
      response: 'There was an error reading the file',
    };
  }
}

export async function update<T>(
  dir: string,
  file: string,
  data: T
): Promise<{
  result: boolean;
  error?: NodeJS.ErrnoException;
  response?: string | T;
}> {
  try {
    await fs.writeFile(`${baseDir}${dir}/${file}.json`, JSON.stringify(data));
    return {
      result: true,
    };
  } catch (e) {
    return {
      result: false,
      error: e,
      response: 'There was an error updating the file',
    };
  }
}

export async function eliminate(
  dir: string,
  file: string
): Promise<{ result: boolean; error?: NodeJS.ErrnoException; response?: string }> {
  try {
    await fs.unlink(`${baseDir}${dir}/${file}.json`);
    return {
      result: true,
    };
  } catch (e) {
    return {
      result: false,
      error: e,
      response: 'There was an error deleting the file',
    };
  }
}

export async function list(
  dir: string
): Promise<{
  result: boolean;
  error?: NodeJS.ErrnoException;
  response?: Array<string> | string;
}> {
  try {
    const response = await fs.readdir(`${baseDir}${dir}/`);
    const trimmedFileNames: Array<string> = [];
    response.forEach((fileName) => {
      trimmedFileNames.push(fileName.replace('.json', ''));
    });
    return {
      result: true,
      response: trimmedFileNames,
    };
  } catch (e) {
    return {
      result: false,
      error: e,
      response: 'There was an error obtaining the list content',
    };
  }
}
