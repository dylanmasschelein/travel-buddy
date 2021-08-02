const bookshelf = require("../utils/bookshelf.js");

const User = bookshelf.model("User", {
  tableName: "users",
  adventures() {
    return this.hasMany("Adventure");
  },
});

module.exports = User;
