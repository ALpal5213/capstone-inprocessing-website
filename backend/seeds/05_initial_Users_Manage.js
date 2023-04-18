const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

const randomizeJobs = () => {
  return Math.floor(Math.random() * 5) + 1
}

const randomizeUnit = () => {
  return Math.floor(Math.random() * 3) + 1
}

const randomizeRole = () => {
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
      role_id:randomizeRole(), 
      is_admin: true, 
      is_supervisor:faker.datatype.boolean(), 
      is_military:faker.datatype.boolean(), 
      job_id:randomizeJobs(), 
      unit_id: randomizeUnit(),
      session_id:faker.datatype.uuid(),
      preferredTheme: faker.helpers.arrayElement(['light', 'dark'])
    })
  })
})

//Adds fake users with hashed passwords
const supervisors = [];
const commanders = [];
for (let i = 0; i <= 100; i++){
  let isSup = faker.datatype.boolean()
  let isCC = faker.datatype.boolean()
  isSup ? supervisors.push(i) : null
  isCC ? commanders.push(i) : null
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(seedPassword, salt, (err, hash) => {
      fakeUsersList.push({
        fullname:faker.name.fullName(), 
        username:faker.internet.userName(), 
        password:hash, 
        role_id:randomizeRole(), 
        is_admin:faker.datatype.boolean(), 
        is_supervisor:isSup, 
        is_leadership:isCC, 
        is_military:faker.datatype.boolean(), 
        job_id:randomizeJobs(), 
        unit_id: randomizeUnit(),
        session_id:faker.datatype.uuid(),
        preferredTheme: faker.helpers.arrayElement(['light', 'dark'])
      })
    })
  })
}

let fakeManageList = [];

const randomUser = () => {
  return Math.floor(Math.random() * 101) + 1
}

const randomSupervisor = (user) => {
  let supIndex = user
  while (supIndex === user) {
    supIndex = Math.floor(Math.random() * supervisors.length)
  }
  return supervisors[supIndex + 1]
}

const randomCommander = (user) => {
  let ccIndex = user
  while (ccIndex === user) {
    ccIndex = Math.floor(Math.random() * commanders.length)
  }
  return commanders[ccIndex + 1]
}

for (let i = 0; i <= 60; i++){
  let user = randomUser();
  fakeManageList.push({
    user_id:user, 
    supervisor_id:randomSupervisor(user), 
    commander_id:randomCommander(user)
  })
}
  
exports.seed = function(knex) {
  // Deletes ALL existing entries
  let knexUsers = knex('Users').del()
    .then(function () {
      // Inserts seed entries
      return knex('Users').insert(fakeUsersList);
    });
  // Deletes ALL existing entries
  let knexManage = knex('Manage').del()
    .then(function () {
      // Inserts seed entries
      return knex('Manage').insert(fakeManageList);
    });
    return (`${knexUsers} ${knexManage}`)
};