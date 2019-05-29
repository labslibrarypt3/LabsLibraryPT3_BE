
exports.up = function(knex) {
    return knex.schema.createTable('Books', table => {
        table.increments();
        table.integer('Library','integer Array')
        table.integer('Borrowed','integer Array')
        table.integer('Lent','integer Array')
});
}

    exports.down = function(knex) {
        return knex.schema.dropTableIfExists('Books');
};
