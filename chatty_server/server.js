const uuidv1 = require('uuid/v1');
const express = require('express');
const SocketServer = require('ws').Server;
const PORT = 3001;
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
  console.log('Client connected!!!!');
//-------------------------------------------  
  
  const numberOfClients = {
    numOfUser: wss.clients.size,
    type: "Incoming newUser"
  };

  wss.clients.forEach(function each(client) {
    if (client.readyState === ws.OPEN) {
      client.send(JSON.stringify(numberOfClients));
    }
  });    
  // ws.send(JSON.stringify(numberOfClients));
//--------------------------------------------    
  ws.on('message', function incoming(data){

    const parsedData = JSON.parse(data);  
    
    switch(parsedData.type) {
      case "Post User":
      parsedData.type = "Incoming User"
      break;

      case "Post Message":
      parsedData.id = uuidv1();
      parsedData.type = "Incoming Message"
      break;
    }; 

      
      wss.clients.forEach(function each(client) {
          if (client.readyState === ws.OPEN) {
            client.send(JSON.stringify(parsedData));
          }
      });    
    })
//-------------------------------------------
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    const numberOfClientsLeft = {
      numOfUser: wss.clients.size,
      type: "Incoming newUser"
    };
    wss.clients.forEach(function each(client) {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify(numberOfClientsLeft));
      }
    });
  })
})
