const readLine = require('readline');
const fs = require('fs')
const http = require('http')
const url = require('url')


//reading the template
const html = fs.readFileSync('./template/index.html', 'utf-8')

//creating an approch to read the json data only once and turn the data into a object
let products = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'))

let productListHtml = fs.readFileSync('./template/products-list.html', 'utf-8')

let productsHtmlArray = products.map((item)=> {
  let output = productListHtml.replace('{{%IMAGE%}}', item.productImage);
  output = output.replace('{{%ID%}}', item.id)
  output = output.replace('{{%NAME%}}', item.productName)
  output = output.replace('{{%MODELNAME%}}', item.modeName)
  output = output.replace('{{%MODELNO%}}', item.modelNumber)
  output = output.replace('{{%SIZE%}}', item.size)
  output = output.replace('{{%CAMERA%}}', item.camera)
  output = output.replace('{{%PRICE%}}', item.price)
  output = output.replace('{{%COLOR%}}', item.color)

  return output;
})

//create a server - the callback is always executed everytime a request hits the server
const server = http.createServer((request, response) => {
  let {query, pathname: path1} = url.parse(request.url, true)
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
      if (!query.id) {
        let productResponseHTML = html.replace('{{%CONTENT%}}', productsHtmlArray.join(','))
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        response.end(productResponseHTML);
        // console.log('JSON de produtos:', productsHtmlArray.join(','))
        break;
      } else {
        response.end(`this is a produt with id: ${query.id}`)
      }

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
