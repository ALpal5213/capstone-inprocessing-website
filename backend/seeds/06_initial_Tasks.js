const { faker } = require('@faker-js/faker');


let fakeTasksList = [];

let installationTasks = [ 'New Employee Orientation', 
'Register For Benefits', 
'Obtain CAC', 'Housing Office', 
 'Turn In Medical Records',
'Education Center',  
'Register Personal Weapons', ]

let unitTasks =['Register for Network Accounts', 
'Obtain provisions', 
'Meet with Leadership', 
'Update DTS', 
'Apply for GTC', 
'Complete Mandatory Training', 
'Cyber Awareness', 
'Update SGLI',]

let jobTasks =['Obtain Security Badge', 'Set Work hours', 'Onboarding Training','Complete TW Agreement']

let personalTasks = ['Enroll in EFMP', 'Register for CDC']

const randomizeUnit = () => {
  return Math.floor(Math.random() * 15) + 1
}

const randomizeUsers = () => {
  return Math.floor(Math.random() * 30) + 1
}

const randomizeLocation = () => {
  return Math.floor(Math.random() * 6) + 1
}

//Add installation Tasks
for (let i = 0; i <= 100; i++){

  fakeTasksList.push({
    user_id: randomizeUsers(), 
    location_id: randomizeLocation(),
    task_name: faker.helpers.arrayElement(installationTasks),
    task_description: faker.helpers.fake('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut aliquam purus sit amet luctus venenatis lectus magna fringilla. Iaculis nunc sed augue lacus viverra vitae congue eu consequat. '), 
    priority: faker.helpers.arrayElement(['low', 'medium', 'high']), 
    task_type: faker.helpers.fake('installation'), 
    due_date: faker.date.future(1), 
    status: faker.helpers.arrayElement(['complete', 'pending', 'incomplete']), 
    task_url: faker.internet.url(),
    mil_or_civ: faker.helpers.arrayElement(['military', 'civilian', 'both']),
    has_upload: faker.datatype.boolean(),
    has_download: faker.datatype.boolean(),
  })
}

//Add Unit Tasks
for (let i = 0; i <= 90; i++){

  fakeTasksList.push({
    user_id: randomizeUsers(), 
    location_id: randomizeLocation(),
    task_name: faker.helpers.arrayElement(unitTasks),
    task_description: faker.helpers.fake('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut aliquam purus sit amet luctus venenatis lectus magna fringilla. Iaculis nunc sed augue lacus viverra vitae congue eu consequat. '), 
    priority: faker.helpers.arrayElement(['low', 'medium', 'high']), 
    task_type: faker.helpers.fake('unit'), 
    due_date: faker.date.future(1), 
    status: faker.helpers.arrayElement(['complete', 'pending', 'incomplete']), 
    task_url: faker.internet.url(),
    mil_or_civ: faker.helpers.arrayElement(['military', 'civilian', 'both']),
    has_upload: faker.datatype.boolean(),
    has_download: faker.datatype.boolean(),
  })
}

//Add Job Tasks
for (let i = 0; i <= 60; i++){

  fakeTasksList.push({
    user_id: randomizeUsers(), 
    location_id: randomizeLocation(),
    task_name: faker.helpers.arrayElement(jobTasks),
    task_description: faker.helpers.fake('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut aliquam purus sit amet luctus venenatis lectus magna fringilla. Iaculis nunc sed augue lacus viverra vitae congue eu consequat. '), 
    priority: faker.helpers.arrayElement(['low', 'medium', 'high']), 
    task_type: faker.helpers.fake('job'), 
    due_date: faker.date.future(1), 
    status: faker.helpers.arrayElement(['complete', 'pending', 'incomplete']), 
    task_url: faker.internet.url(),
    mil_or_civ: faker.helpers.arrayElement(['military', 'civilian', 'both']),
    has_upload: faker.datatype.boolean(),
    has_download: faker.datatype.boolean(),
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


