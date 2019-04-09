exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", userstbl => {
    userstbl.increments();

    userstbl.string("username", 255).notNullable().unique;

    userstbl.string("password", 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
