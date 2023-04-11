const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

const randomizeJobs = () => {
  return Math.floor(Math.random() * 5) + 1
}

const randomizeUnit = () => {
  return Math.floor(Math.random() * 3) + 1
}

const saltRounds = 10;
const sedPasswordForHardCodedAdmin = '123';
const seedPassword = 'password';

let fakeUsersList = [];

//Hard-coded Admin Account
bcrypt.genSalt(saltRounds, (err, salt) => {
  bcrypt.hash(sedPasswordForHardCodedAdmin, salt, (err, hash) => {
    fakeUsersList.push({
      fullname:faker.name.fullName(), 
      username:'admin', 
      password:hash, 
      is_admin:faker.datatype.boolean(), 
      is_supervisor:faker.datatype.boolean(), 
      is_military:faker.datatype.boolean(), 
      job_id:randomizeJobs(), 
      unit_id: randomizeUnit(),
      session_id:faker.datatype.uuid()
    })
  })
})

//Adds fake users with hashed passwords
for (let i = 0; i <= 100; i++){
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(seedPassword, salt, (err, hash) => {
      fakeUsersList.push({
        fullname:faker.name.fullName(), 
        username:faker.internet.userName(), 
        password:hash, 
        is_admin:faker.datatype.boolean(), 
        is_supervisor:faker.datatype.boolean(), 
        is_military:faker.datatype.boolean(), 
        job_id:randomizeJobs(), 
        unit_id: randomizeUnit(),
        session_id:faker.datatype.uuid()
      })
    })
  })
}
  
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Users').del()
    .then(function () {
      // Inserts seed entries
      return knex('Users').insert(fakeUsersList);
    });
};