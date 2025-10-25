const fs = require('fs')
const http = require('http')
const url = require('url')
const replaceHtml = require('./Modules/replaceHtml')

// Templates
const html = fs.readFileSync('./template/index.html', 'utf-8')
// console.log('retorno do html:',html)
const productListHtml = fs.readFileSync('./template/products-list.html', 'utf-8')
const productDetailHtml = fs.readFileSync('./template/product-detail.html', 'utf-8')

// Dados
const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'))

const server = http.createServer((request, response) => {
  let {query, pathname: path} = url.parse(request.url, true)
  
  if (path.toLowerCase() === '/' || path.toLowerCase() === '/home') {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    response.end(html.replace('{{%CONTENT%}}', 'You are in the home page'))
  }

  else if (path.toLowerCase() === '/about') {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    response.end(html.replace('{{%CONTENT%}}', 'You are in the about page'))
  }

  else if (path.toLowerCase() === '/contact') {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    response.end(html.replace('{{%CONTENT%}}', 'You are in the contact page'))
  }

  else if (path.toLowerCase() === '/products') {
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
    }

  else {
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
