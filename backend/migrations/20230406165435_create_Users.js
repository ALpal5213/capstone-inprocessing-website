/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('Users', table => {
        table.increments('user_id');
        table.string('user_name');
        table.boolean('is_admin');
        table.boolean('is_supervisor');
        table.boolean('is_military');
        table.integer('job_id');
        table.foreign('job_id').references('Jobs');
        table.integer('unit_id');
        table.foreign('unit_id').references('Units');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('Users');
};
