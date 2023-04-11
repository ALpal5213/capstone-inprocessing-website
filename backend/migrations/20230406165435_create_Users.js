/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('Users', table => {
        table.increments('id');
        table.string('fullname');
        table.string('username');
        table.string('password');
        table.boolean('is_admin');
        table.boolean('is_supervisor');
        table.boolean('is_military');
        table.integer('job_id');
        table.foreign('job_id').references('Jobs.id');
        table.integer('unit_id');
        table.foreign('unit_id').references('Units.id');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('Users');
};
