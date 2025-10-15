const readLine = require('readline');
const fs = require('fs')

const http = require('http')


//reading the template
const html = fs.readFileSync('./template/index.html', 'utf-8')

//creating an approch to read the json data only once and turn the data into a object
let products = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'))


//create a server - the callback is always executed everytime a request hits the server
const server = http.createServer((request, response) => {
  let path = request.url.toLowerCase();

  switch (path) {
    case '/':
    case '/home':
      response.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      })
      response.end(html.replace('{{%CONTENT%}}', 'You are in the home page'));
      break;

    case '/about':
      response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      response.end(html.replace('{{%CONTENT%}}', 'You are in the about page'));
      break;

    case '/contact':
      response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      response.end(html.replace('{{%CONTENT%}}', 'You are in the contact page'));
      break;
    
    case '/products':

      response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
      response.end('you are in the products page')
      console.log('JSON de produtos:', products)

      // response.end(html.replace('{{%CONTENT%}}', 'You are in the products page'));
      break;

    default:
      response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
      response.end(html.replace('{{%CONTENT%}}', '404 - Page not found'));
      break;
  }
});

// start the server
server.listen(8000, '127.0.0.1', () => {
  console.log('server have started!')
})
