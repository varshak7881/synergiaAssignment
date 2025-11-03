const express = require('express');
const server = express();
server.use(express.json());
let profile = {
  name: "",
  age: 0,
  email: "",
  city: "",
  college: ""
};

server.post('/create-profile', (request, response) => {
  const { name, age, email, city, college } = request.body;
  profile.name = name;
  profile.age = age;
  profile.email = email;
  profile.city = city;
  profile.college = college;

  console.log("Profile Created:");
  console.log(profile);

  response.send("Profile created successfully!");
});

server.get('/get-profile', (request, response) => {
  response.json(profile);
});

server.get('/get-summary', (request, response) => {
  response.json({
    message: `Hello ${profile.name} from ${profile.college}!`
  });
});

server.listen(3000, () => {
  console.log("Server started on port 3000");
});