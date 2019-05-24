

    exports.up = function(knex, Promise) {
        return knex.schema.createTable('Users', table => {
            table.increments();
            table.string('firstName').notNullable();
            table.string('lastName').notNullable();
            table.string('email').unique().notNullable();
            table.string('phoneNumber').unique().notNullable();
            //include username and password
            // table.foreign('Book_id').references() come back to this when table is set up
    })
    };
    
    exports.down = function(knex, Promise) {
        return knex.schema.dropTableIfExists('Users');
    };

