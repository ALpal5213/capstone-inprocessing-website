/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Tasks', table => {
        table.increments('task_id');
        table.string('task_name');
        table.string('task_description');
        table.enum('priority', ['low', 'medium', 'high']); //enum
        table.enum('task_type', ['installation', 'unit', 'job', 'personal']); //enum
        table.date('due_date');
        table.enum('status', ['complete', 'pending']); //enum
        table.integer('user_id');
        table.foreign('user_id').references('Users');
        table.integer('location_id');
        table.foreign('location_id').references('Locations');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Tasks');
};
