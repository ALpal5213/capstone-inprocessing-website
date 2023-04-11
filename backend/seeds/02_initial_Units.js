const { faker } = require('@faker-js/faker');

let fakeUnitsList = [
  {unit_name: "88th Air Base Wing"}, 
  {unit_name: "88th FSS"},
  {unit_name: "445th Airlift Wing"},
  {unit_name: "665th Intelligence, Surveillance, & Reconnaissance Wing"},
  {unit_name: "AFMC"},
  {unit_name: "AFLCMC"},
  {unit_name: "AFRL"},
  {unit_name: "AFIT"},
  {unit_name: "Military & Family Readiness Center"},
  {unit_name: "NASIC/NSIC"},
  {unit_name: "Naval Medical Research Unit Dayton "},
  {unit_name: "NMUSAF"},
  {unit_name: "USAF Marathon Office"},
  {unit_name: "WPAFB Medical Center"},
  {unit_name: "WPAFB Veterinary Services"}
];

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Units').del()
    .then(function () {
      // Inserts seed entries
      return knex('Units').insert(fakeUnitsList);
    });
};