const express = require('express');
const { request } = require('http');
const { resourceUsage } = require('process');
const server = express();
server.use(express.json())

// Login route
// server.get('/login', (request, response) => {
//     const email = request.query.email;
//     const password = request.query.password;

//     if (email === "varshak935308@gmail.com" && password === "varsha123") {
//         response.send('Login Successful');
//     } else {
//         response.send('Login Failed');
//     }
// });


let students=[]
server.get('/students',(request,response)=>{
    response.send(students)
})
server.delete('/student/:usn',(request,response)=>{
students=students.filter((student)=>
    student.usn!=request.params.usn)
    response.send('Student deleted')
})
server.post('/student/add',(request,response)=>{
    const {usn,name,age,contact}=request.body;//deconstructing in js
    students.push({
        usn,
        name,
        age,
        contact,
    });
    response.send('Student added')
});
server.post('/login', (request, response) => {
    const email = request.body.email;
    const password = request.body.password;

    if (email === "varshak935308@gmail.com" && password === "varsha123") {
        response.send('Login Successful');
    } else {
        response.send('Login Failed');
    }
});





// Home route
server.get('/', (request, response) => {
    const fname = 'Varsha';
    const lname = 'Gowda';
    const usn = '4SF23IS117';
    response.send(`My Name is: ${fname} ${lname}<br>USN: ${usn}`);
});

// Start server
server.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
