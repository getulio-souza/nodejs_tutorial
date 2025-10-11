const readLine = require('readline');
const fs = require('fs')

const http = require('http')

//create a server - the callback is always executed everytime a request hits the server
const server = http.createServer((request, response) => {
  console.log('a new request received:', request)
})

// start the server
server.listen(8000, '127.0.0.1', () => {
  console.log('server have started!')
})
