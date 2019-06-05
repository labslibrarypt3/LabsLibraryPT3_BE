

    exports.up = function(knex) {
        return knex.schema.createTable('Users', table =>{
            table.increments();
            table.string('name').notNullable();
            table.string('email').unique().notNullable();
            table.string('password').notNullable();
            table.string('library')
            table.string('lent')
            table.string('borrowed')
            
    })
    };
    //User
// - id
// - Library
// - lent
// - Borrowing
    exports.down = function(knex) {
        return knex.schema.dropTableIfExists('Users');
    };
    

