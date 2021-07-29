const bookshelf = require("../utils/bookshelf.js");

const User = bookshelf.model("User", {
  tableName: "users",
  blogs() {
    return this.hasMany("Blog");
  },
});

module.exports = User;
