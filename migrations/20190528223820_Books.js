
exports.up = function(knex) {
    return knex.schema.createTable('Books', table => {
        table.increments();
        table.string('title')
             .notNullable();
        table.string('authors')
             .notNullable();
        table.integer('ISBN')
             .notNullable()  
   
            
});
}
// Book
// - id
// - title
// - authors
// - ISBN

    exports.down = function(knex) {
        return knex.schema.dropTableIfExists('Books');
};
