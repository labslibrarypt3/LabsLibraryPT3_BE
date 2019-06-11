// this table handles transactions for the borrowing and lending components possible to use checkoutId as foreign
// timetable to handle due dates and checkout dates.
exports.up = function(knex, Promise) {
    return knex.schema.createTable('User_Book', table =>{
        table.increments('checkoutId');

        table.bigInteger('lender_id')
            .references('userId')
            .inTable('Users')

        table.bigInteger('borrower_id')
             .references('userId')
             .inTable('Users')

        table.bigInteger('book_id')
             .references('bookId')
             .inTable('Books') 
        
})

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('User_Book');
};
