let x = 'Aashutosh'

let y = {
    'name':'Aashutosh',     // 'Key':'Value' -- Key cannot be numbers it must be String //
    'age': '20'
}

function add(x,y){
    return x+y

}
const multiply =(x,y) =>{
    return x * y 
}

const subtract =(x,y) => x - y



console.log(add(2,4))
console.log(multiply(2,4))
console.log(subtract(2,4))


let z = [1,2,3]                     /* Lists in JS are treated as Object*/

let numbers = []

z. forEach((item)=>{
    numbers.push(item*2)
})





console.log(numbers)
console.log(y.name)
console.log(typeof(y))
