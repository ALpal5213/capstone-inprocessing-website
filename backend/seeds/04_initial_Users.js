const { faker } = require('@faker-js/faker');


let fakeUsersList = [];

const randomizeJobs = () => {
  return Math.floor(Math.random() * 5) + 1
}

const randomizeUnit = () => {
  return Math.floor(Math.random() * 3) + 1
}

for (let i = 0; i <= 100; i++){
  fakeUsersList.push({
    fullname:faker.name.fullName(), 
    username:faker.internet.userName(), 
    password:faker.internet.password(), 
    is_admin:faker.datatype.boolean(), 
    is_supervisor:faker.datatype.boolean(), 
    is_military:faker.datatype.boolean(), 
    job_id:randomizeJobs(), 
    unit_id: randomizeUnit()
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