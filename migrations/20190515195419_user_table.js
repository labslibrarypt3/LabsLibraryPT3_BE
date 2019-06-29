

    exports.up = function(knex) {
        return knex.schema.createTable('Users', table =>{
            table.increments('userId');
            table.string('name').notNullable();
            table.string('firstName')
            table.string('lastName')
            table.string('email').unique().notNullable();
            table.string('img');
            table.string('password').notNullable();
            table.string('address');
            table.string('city');
            table.string('state');
            table.string('zipcode');
            table.string('latitude');
            table.string('longitude');
            table.integer('stripe_user_id');
                   
    })
    };

    exports.down = function(knex) {
        return knex.schema.dropTableIfExists('Users');
    };
    

