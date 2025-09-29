//reading and writing files asychronously
const fs = require('fs')

//the first argument receive the error object while the second argument receive the data
fs.readFile('./files/start.txt', 'utf-8' , (err, data1)=> {
    console.log(data1)
    fs.readFile(`./files/${data1}.txt`)
})
console.log('reading file...')