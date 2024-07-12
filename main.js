// var a=10;
// var b=11;
// var ans=a+b
// console.log(ans);

// var cars=["swift", "lambo",32];
// cars.push("tesla")
// console.log(cars[2]);

// if(ans<20) console.log(ans);
// else console.log("Sorry")

// for(var i=0; i<cars.length; i++){
//     console.log(cars[i]);
// }

// const person={
//     name: "john",
//     age: 21,
//     isStudent: true,
//     hobbies: ["reading","swimming"]
// };

// // console.log(person);
// console.log(person.isStudent);

// const ages=[32,33,36,79];
// const result=ages.filter(checkAge);

// function checkAge(age){
//     return age>=35
// }

// console.log(result);
var prompt=require('prompt-sync')();
const age= prompt("Please enter tyour age:");
if(age<18){
    console.log("Minor");
}else{
    console.log("Major");
}