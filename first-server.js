const readLine = require('readline');
const fs = require('fs')

const http = require('http')

//create a server - the callback is always executed everytime a request hits the server
const server = http.createServer((request, response) => {
  response.end('hello from the server')
  console.log('a new request received')
  console.log(response)
})

// start the server
server.listen(8000, '127.0.0.1', () => {
  console.log('server have started!')
})
