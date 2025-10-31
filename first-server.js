// CORE MODULES
const fs = require('fs')
const http = require('http')
const url = require('url')
const replaceHtml = require('./Modules/replaceHtml')
const events = require('events')

// USER DEFINED MODULES
const html = fs.readFileSync('./template/index.html', 'utf-8')
const productListHtml = fs.readFileSync('./template/products-list.html', 'utf-8')
const productDetailHtml = fs.readFileSync('./template/product-detail.html', 'utf-8')

//USER CLASS
const user = require('./Modules/user')

// Dados
const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'))

//create a new server
const server = http.createServer();

server.on('request', (req, response) => {
  let {
    query,
    pathname: path
  } = url.parse(req.url, true)

  if (path.toLowerCase() === '/' || path.toLowerCase() === '/home') {
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })
    response.end(html.replace('{{%CONTENT%}}', 'You are in the home page'))
  } else if (path.toLowerCase() === '/about') {
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })
    response.end(html.replace('{{%CONTENT%}}', 'You are in the about page'))
  } else if (path.toLowerCase() === '/contact') {
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })
    response.end(html.replace('{{%CONTENT%}}', 'You are in the contact page'))
  } else if (path.toLowerCase() === '/products') {
    if (!query.id) {
      const productsHtmlArray = products.map(prod => replaceHtml(productListHtml, prod))
      const productResponseHTML = html.replace('{{%CONTENT%}}', productsHtmlArray.join(','))
      response.end(productResponseHTML)
    } else {
      let prod = products[query.id]
      // console.log('id retornado:',prod)
      let productDetailResponseHtml = replaceHtml(productDetailHtml, prod)
      // console.log('template retornado:',productDetailResponseHtml)
      response.end(html.replace('{{%CONTENT%}}', productDetailResponseHtml))
    }
  } else {
    response.writeHead(404)
    // response.end(html.replace('{{%CONTENT%}}', '404 - Page not found'))
    response.end(JSON.stringify({
      message: 'Produto não encontrado',
      data: null
    }));

  }
})


server.listen(8000, '127.0.0.1', () => {
  console.log('🚀 Server started at http://127.0.0.1:8000')
})

let myEmmiter = new user();
// console.log(myEmmiter)

myEmmiter.on('userCreated', (id, name) => {
  console.log('new user is created')
  console.log('user id:', id)
  console.log('user name:', name)
})

myEmmiter.emit('userCreated', 101, 'getulio');