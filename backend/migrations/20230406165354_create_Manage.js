/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Manage', table => {
        //user_id, supervisor_id, commander_id
        table.increments('id');
        table.integer('user_id');
        table.integer('supervisor_id');
        table.integer('commander_id');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Manage');
};
