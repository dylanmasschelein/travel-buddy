const bookshelf = require("../utils/database.ts");

const User = bookshelf.model("User", {
  tableName: "users",
  blogs() {
    return this.hasMany("Blogs");
  },
});

module.exports = User;
