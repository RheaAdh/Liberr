import { route, HTTPError } from '../utils/utilities';

export const exampleRoute = route((req, res) => {
  // don't forget to wrap function in route()
  if ('some standard error') throw new HTTPError(400, 'Message'); // (Status code, Message)
  if ('some random error') throw new Error('Message'); // (Message)
  res.sendStatus(200);
});
