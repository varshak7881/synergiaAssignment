async function main(){
    await task1();
    await task2();
    await task3();
    await task4();
    await task5();

}
main();
async function task1(){
    console.log("Task 1");
}
async function task2(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("Task 2")
            resolve("executed");
        },1000);
    })
}
async function task3(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("Task 3")
            resolve("executed");
        },3000);
    })
}
async function task4(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("Task 4")
            resolve("executed");
        },2000);
    })
}
async function task5(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("Task 5")
            resolve("executed");
        },5000);
    })
}
