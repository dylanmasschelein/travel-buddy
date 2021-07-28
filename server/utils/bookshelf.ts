const knex = require("knex")(require("./knexfile.ts"));
const bookshelf = require("bookshelf")(knex);

module.exports = bookshelf;
