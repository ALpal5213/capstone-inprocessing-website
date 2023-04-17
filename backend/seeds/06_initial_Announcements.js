/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Announcements').del()
  await knex('Announcements').insert([
    {announcement: 'Building 270 is closed today', image: './announce-icon.png'},
    {announcement: 'Gate 01 Visitor Center will be closed for training on April 26th. Please use the Gate 02 Visitor Center. Extra text to display what a really long announcement will look like in this section. Scroll to see additional announcement text or just do not write really long announcements', image: './announce-icon.png'},
    {announcement: 'Finance Office hours will be from 10 a.m. to 2 p.m. on April 28th', image: './announce-icon.png'},
    {announcement: 'Base operations limited on Memorial Day', image: './announce-icon.png'},
    {announcement: 'Personnel Office closed for training on April 28th', image: './announce-icon.png'},
    {announcement: 'Main Gate is shutdown for training on April 24th', image: './announce-icon.png'},
    {announcement: 'Incident at building 345. Avoid area until further notice', image: './announce-icon.png'},
    {announcement: 'Building 101 north entrance is under construction.', image: './announce-icon.png'},
  ]);
};
