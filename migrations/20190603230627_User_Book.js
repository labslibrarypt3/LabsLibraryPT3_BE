
exports.up = function(knex, Promise) {
    return knex.schema.createTable('User_Book', table =>{
        table.bigInteger('user_id')
        .references('id')
        .inTable('Users')

        table.bigInteger('book_id')
             .references('id')
             .inTable('Books')
        
})

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('User_Book');
};
