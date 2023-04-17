const { faker } = require('@faker-js/faker');


let fakeTasksList = [];

let priorities = ['low', 'medium', 'high']
let taskTypes = ['installation', 'unit', 'job', 'personal']
let statusList = ['complete', 'pending', 'incomplete']
let milOrCivList = ['military', 'civilian', 'both']

// const randomizeJobs = () => {
//   return Math.floor(Math.random() * 5) + 1
// }

const randomizeUnit = () => {
  return Math.floor(Math.random() * 15) + 1
}

const randomizeUsers = () => {
  return Math.floor(Math.random() * 101) + 1
}

const randomizeLocation = () => {
  return Math.floor(Math.random() * 6) + 1
}

const randomize2 = () => {
  return Math.floor(Math.random() * 1)
}

const randomize3 = () => {
  return Math.floor(Math.random() * 2)
}

const randomize4 = () => {
  return Math.floor(Math.random() * 3)
}

for (let i = 0; i <= 1000; i++){
  fakeTasksList.push({
    user_id:randomizeUsers(), 
    location_id:randomizeLocation(),
    task_name:faker.name.jobArea(),
    task_description:faker.commerce.productDescription(), 
    priority:priorities[randomize3()], 
    task_type:taskTypes[randomize4()], 
    due_date:faker.date.future(1), 
    status:statusList[randomize3()], 
    task_url:faker.internet.url(),
    mil_or_civ:milOrCivList[randomize3()],
    has_upload:faker.datatype.boolean(),
    has_download:faker.datatype.boolean(),
  })
}

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('Tasks').insert(fakeTasksList);
    });
};


