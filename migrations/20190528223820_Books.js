exports.up = function(knex) {
  return knex.schema.createTable("Books", table => {
    table.increments("bookId");

    table.string("title").notNullable();

    table.string("authors").notNullable();

    table.string("cover");

    table
      .bigInteger("user_id")
      .references("userId")
      .inTable("Users");
  });
};
// Book
// - id
// - title
// - authors
// - ISBN

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("Books");
};
