
exports.up = function(knex) {
    return knex.schema.createTable('Books', table => {
        table.increments();
        table.integer('Library')
        table.integer('Borrowed')
        table.integer('Lent')
});
}

    exports.down = function(knex) {
        return knex.schema.dropTableIfExists('Books');
};
