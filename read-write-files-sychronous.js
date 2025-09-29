//reading and writing files 
const fs = require('fs')
const { text } = require('stream/consumers')
// console.log(fs)

//reading files Synchronously 
let textInPut = fs.readFileSync('./files/input.txt', 'utf-8')
console.log(textInPut)

const content = `data read from input.txt: ${textInPut} \nDate created ${new Date()}`
fs.writeFileSync('./files/output.txt', content)