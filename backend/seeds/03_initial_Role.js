const { faker } = require('@faker-js/faker');

let fakeRoleList = [
  {role: null}, 
  {role: 'Squadron Admin'}, 
  {role: 'Program Admin'}
  
];

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Role').del()
    .then(function () {
      // Inserts seed entries
      return knex('Role').insert(fakeRoleList);
    });
};