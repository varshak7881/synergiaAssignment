// console.log-synchronous
//How js and noejs execute& menu driven program means
//disadvnatge of callback chain-call back hell
console.log("Task 1")
setTimeout(() => {
    console.log("Task 2")
    setTimeout(()=>{
    console.log("Task 3")
    setTimeout(() => {
    console.log("Task 4")
    setTimeout(() => {
    console.log("Task 5")
    setTimeout(() => {
    console.log("Task 6")
},10000)
},1000)
},7000)
},2000)
},4000)




