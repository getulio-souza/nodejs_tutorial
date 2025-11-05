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


// server.on('request', (req, res)=> {
//   fs.readFile('./files/large-file.txt', (err, data)=> {
//     if(err){
//       res.end('something went wrong');
//       return;
//     }else{
//       res.end(data)
//     }
//   })
// })

// server.on('request', (req, res)=> {
//   let rs = fs.createReadStream('./files/large-file.txt');

//   //in the callback function we receive the piece/chunk of data
//   rs.on('data', (chunk)=> {
//     res.write(chunk)
//   })

//   //now we use the end method because there is no more data 
//   rs.on('end', ()=> {
//     res.end();
//   })

//   rs.on('error', (err)=> {
//     res.end(err)
//   })

// })

//we use write because we are going to get the data piece by piece

// if we use read, the first chunk of data will be arrived and no more data will be get


// SOLUTION 3: USING PIPE METHOD

server.on('request', (req, res)=> {
  let rs = fs.createReadStream('./files/large-file.txt');
  rs.pipe(res)

})

//pipe method is only avaliable in readble streams.