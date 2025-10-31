const fs = require('fs')
const http = require('http')

const server = http.createServer();


server.listen(8000, '127.0.0.1', () => {
  console.log('server has started!')
})

//solution with readfile - takes more time to complete
// server.on('request', (req, res) => {
//   fs.readFile('./files/large-file.txt', (err, data) => {
//     if (err) {
//       res.end('there was an error')
//     }
//     res.end(data);
//   })
// })


server.on('request', (req, res) => {
  let rs = fs.createReadStream('./files/large-file.txt');

  rs.on('data', (chunk) => {
    res.write(chunk)
    res.end(); 
  })
})
