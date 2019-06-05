exports.up = function(knex, Promise) {
    return knex.schema.createTable('blank', table =>{
    
        
})

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('blank');
};