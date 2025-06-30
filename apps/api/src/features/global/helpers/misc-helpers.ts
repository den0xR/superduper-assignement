// Normalize a port into a number, string, or false. From Express Generator. 
export function normalizePort(val: string): number | string | false {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
