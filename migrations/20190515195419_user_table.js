

    exports.up = function(knex, Promise) {
        return knex.schema.createTable('Users', table => {
            table.increments();
            table.string('name').notNullable();
            // table.string('lastName').notNullable();
            table.string('email').unique().notNullable();
            table.string('password').notNullable();
            // table.integer('phoneNumber').unique().notNullable();
            //include username and password
            // table.foreign('Book_id').references() come back to this when table is set up
    })
    };
    
    exports.down = function(knex, Promise) {
        return knex.schema.dropTableIfExists('Users');
    };
    

