
//Removed unit_id foreign key


exports.up = function(knex) {
    return knex.schema.createTable('Tasks', table => {
        table.increments('id');
        table.integer('user_id');
        table.foreign('user_id').references('Users.id');
        table.integer('location_id');
        table.foreign('location_id').references('Locations.id');
        table.string('task_name');
        table.string('task_description');
        table.string('priority')
        table.string('task_type'); 
        table.string('mil_or_civ');
        table.string('due_date');
        table.string('status'); 
        table.string('task_url');
        table.boolean('has_upload');
        table.boolean('has_download');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Tasks');
};
