const bookshelf = require("../utils/bookshelf.js");

const Adventure = bookshelf.model("Adventure", {
  tableName: "adventures",
  users() {
    return this.hasMany("User");
  },
});

module.exports = Adventure;
