/*
 * Servers tasks
 *
 * */

import http from 'http';
import url from 'url';
import { StringDecoder } from 'string_decoder';

/*
 * Configuration - Helpers
 *
 * */

import config from '../../config';
import * as helpers from '../helpers';
import * as handlers from '../handlers';

/*
 *Types
 *
 * */
import type { IncomingMessage, ServerResponse } from 'http';
import type { RoutesType, MethodsType, DataType, UserType } from '../../index.d.types';

function setupServer(req: IncomingMessage, res: ServerResponse): void {
  const { method, url: urlReq, headers } = req;
  const parseUrl = url.parse(urlReq || '', true);

  const { pathname: path, query: queryStringObject } = parseUrl;
  const trimmedPath = (path && path.replace(/^\/+|\/+$/g, '')) || '';
  const decoder = new StringDecoder('utf-8');
  let buffer = '';

  req.on('data', (data) => {
    buffer += decoder.write(data);
  });

  req.on('end', () => {
    buffer += decoder.end();

    const methodToProcess = method?.toLowerCase() || '';

    if (
      ['users', 'tokens', 'items', 'carts'].includes(trimmedPath) &&
      ['get', 'post', 'put', 'delete'].includes(methodToProcess)
    ) {
      const route: RoutesType = trimmedPath as RoutesType;
      const verb: MethodsType =
        methodToProcess.toLowerCase() === 'delete' ? 'eliminate' : (methodToProcess as MethodsType);
      const data: DataType = {
        headers,
        trimmedPath,
        method,
        payload: helpers.parseJsonToObject(buffer),
        query: queryStringObject,
      };
      const response = handlers[route][verb](data);
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(200);
      res.end(JSON.stringify(response || {}));
    } else {
      const response = handlers.notFound();
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(404);
      res.end(JSON.stringify(response));
    }
  });
}
function startServer(): void {
  const httpServer = http.createServer((req, res) => {
    setupServer(req, res);
  });
  httpServer.listen(config.httpPort, () => {
    console.log(
      '\x1b[36m%s\x1b[0m',
      `The server is listening on port ${config.httpPort} in ${config.env} mode`
    );
  });
}

export default function init(): void {
  startServer();
}
