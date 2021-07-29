const bookshelf = require("../utils/bookshelf.ts");

const User = bookshelf.model("Users", {
  tableName: "users",
  blogs: function () {
    return this.hasMany("Blogs");
  },
});

module.exports = User;
