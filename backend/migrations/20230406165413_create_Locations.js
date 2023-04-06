/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('Locations', table => {
        table.increments('location_id');
        table.string('building');
        table.string('room');
        table.string('address');
        table.string('phone_number');
        table.string('hours');
        table.string('url');
        table.string('notes');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('Locations');
};
