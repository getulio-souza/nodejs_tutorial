// console.log('hello from node js')
// console.log('hello from node js 2')

//import module

const readLine = require('readline');
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("Please enter your name:", (name)=> {
    console.log(`you entered ${name}`)
    rl.close()
})

rl.on('close', ()=> {
    console.log('interface closed')
    process.exit(0)
})