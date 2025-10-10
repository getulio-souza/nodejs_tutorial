//reading and writing files 
const fs = require('fs')
// const { text } = require('stream/consumers')
// // console.log(fs)

// //reading files Synchronously 
// let textInPut = fs.readFileSync('./files/input.txt', 'utf-8')
// console.log(textInPut)

// const content = `data read from input.txt: ${textInPut} \nDate created ${new Date()}`
// fs.writeFileSync('./files/output.txt', content)


//first read the file and after its completed, calls the callback function
//inside the callback, we pass two arguments (error and data)
fs.readFile('./files/start.txt', 'utf-8', (err, data)=> {
    console.log(data)

    fs.readFile(`./files/${data}.txt`, 'utf-8', (err2, data2)=>{
        console.log(data2)
        console.log('error reading file:',err2)

        fs.readFile('./files/append.txt', 'utf-8', (err3, data3)=> {
            console.log(data3)

            fs.writeFile('./files/output.txt', `${data2} \n \n ${data3} \n\n ${new Date()}`, ()=>{
                console.log('files written successfully!')
            })
        })
    })
})

console.log('reading file...')