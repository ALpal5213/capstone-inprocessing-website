const { faker } = require('@faker-js/faker');


let fakeJobsList = [];


for (let i = 0; i <= 5; i++){
  fakeJobsList.push({job_name:faker.name.jobTitle()})
}

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Jobs').del()
    .then(function () {
      // Inserts seed entries
      return knex('Jobs').insert(fakeJobsList);
    });
};