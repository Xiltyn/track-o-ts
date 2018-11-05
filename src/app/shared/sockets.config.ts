const socketIOClient = require('socket.io-client');
const sailsIOClient = require('sails.io.js');

// Instantiate the socket client (`io`)
// (for now, you must explicitly pass in the socket.io client when using this library from Node.js)
export const socketIO = sailsIOClient(socketIOClient);

// Set some options:
// (you have to specify the host and port of the Sails backend when using this library from Node.js)
//socketIO.sails.url = 'wss://echo.websocket.org';
//// ...
//
//// Send a GET request to `http://localhost:1337/hello`:
//socketIO.socket.get('/hello', (body:Object, JWR:Response) => {
//    // body === JWR.body
//    console.log('JWR', JWR.constructor);
//    console.log('body', body.constructor);
//    //console.log('Sails responded with: ', body);
//    //console.log('with headers: ', JWR.headers);
//    //console.log('and with status code: ', JWR.statusCode);
//
//    // ...
//    // more stuff
//    // ...
//
//
//    // When you are finished with `io.socket`, or any other sockets you connect manually,
//    // you should make sure and disconnect them, e.g.:
//    socketIO.socket.disconnect();
//
//    // (note that there is no callback argument to the `.disconnect` method)
//});
