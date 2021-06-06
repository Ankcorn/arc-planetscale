import arc, { HttpRequest } from '@architect/functions';

async function main(req: HttpRequest) {
  return {
    statusCode: 200,
    body: ''
  }
}

export const handler = arc.http.async(main);
