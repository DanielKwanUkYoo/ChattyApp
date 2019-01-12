const uuidv1 = require('uuid/v1');
const express = require('express');
const SocketServer = require('ws').Server;
const PORT = 3001;
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));
const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected!!!!');
//-------------------------------------------  
  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === ws.OPEN) {
        client.send(data);
      }
    });
  };

  const numberOfClients = {
    numOfUser: wss.clients.size,
    type: "Incoming newUser"
  };

  wss.broadcast(JSON.stringify(numberOfClients));    

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

    wss.broadcast(JSON.stringify(parsedData));
  
  })
//-------------------------------------------

  ws.on('close', () => {
    const numberOfClientsLeft = {
      numOfUser: wss.clients.size,
      type: "Incoming newUser"
    };
    wss.broadcast(JSON.stringify(numberOfClientsLeft))
  })
})
