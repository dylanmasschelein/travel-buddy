const bookshelf = require("../utils/bookshelf.js");

const Adventure = bookshelf.model("Adventure", {
  tableName: "adventures",
  users() {
    return this.belongsToMany("User");
  },
});

module.exports = Adventure;
