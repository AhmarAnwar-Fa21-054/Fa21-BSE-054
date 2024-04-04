let ahmar = {
    name: "ahmar",
    age: 21,
    semester: 6,
    address: {state:"Pakistan",city:"Kamra",colony:"APF"},
    degreeProgram:{name:"BSSE",field:"Software",semesterTenure:"4yrs"}
}

console.log(`Name:${ahmar.name} Age:${ahmar.age} Semester:${ahmar.semester} 
Adress:${ahmar.address.colony} ${ahmar.address.city} ${ahmar.address.state}  DegreeProgram:${ahmar.degreeProgram.name} 
${ahmar.degreeProgram.field} ${ahmar.degreeProgram.semesterTenure} `)

function SolveThis(x) {
    let result = {}
    if (x.max) {
        result["max"] = Math.max(...x.max) //... spread operator : breaks an array into individual values or items.
                                        //The spread operator (...) allows you to expand an iterable (such as an array, a string, or an object) 
                                        //into individual elements.
    }
    if (x.min) {
        result["min"] = Math.min(...x.min)
    }
    if (x.sum) {
        let sum = 0
        for (let index = 0; index < x.sum.length; index++) {
            sum += x.sum[index]
        }
        result["Sum"] = sum
    }
    if (x.abs) {
        result["abs"] = Math.abs(x.abs)
    }
    if (x.ceil) {
        result["ceil"] = Math.ceil(x.ceil)
    }
    if (x.floor) {
        result["floor"] = Math.floor(x.floor)
    }
    return result
}

let result = SolveThis({ sum:[], max: [2, 4, 3, 5], min: [5, 3, 4, 3], abs: -22, ceil: 9.5, floor: 9.5 })
console.log(result)
let myName = "a hmar"
let anArray=[...myName]
console.log(anArray)