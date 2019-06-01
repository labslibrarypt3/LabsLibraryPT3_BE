
exports.up = function(knex) {
    return knex.schema.createTable('Books', table => {
        table.increments();
        table.string('Library')
             .notNullable();
        table.string('status')
             .notNullable();
        table
             .timestamp("created_at")
             .notNullable()
             

        table
             .timestamp("updated_at")
             .notNullable()
        
        table
             .string("Due date")
             .notNullable()
             
        table.bigInteger('user_id')
             .references('id')
             .inTable('Users')
            
});
}

    exports.down = function(knex) {
        return knex.schema.dropTableIfExists('Books');
};
