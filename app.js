/**/
const express = require('express')
const app = express()

app.get("/", function(req, res) {
    //when we get an http get request to the root/homepage
    res.send("Hello express");
});

module.exports = app



// git add . && git commit -m "Update" && git push -u origin main
/*
const aedes = require('aedes')()
const server = require('net').createServer(aedes.handle)
const port = 80

server.listen(port, function () {
  console.log('server started and listening on port ', port)
})
*/

/** 
let http = require('http'),
port = 8080;//process.env.PORT || process.argv[2] || 8080;
let server = http.createServer(function (req, res) { 
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.write('hello Vercel!', 'utf-8');
        res.end();
 
    });
 
server.listen(port, function () { 
    console.log('app up on port: ' + port); 
});

*/
/** 
const WebSocket = require('ws');
 
const wss = new WebSocket.Server({ port: 80 });
 
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send(message);
  });
 
 // ws.send('something');
});
*/