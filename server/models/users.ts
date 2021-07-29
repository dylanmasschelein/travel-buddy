const bookshelf = require("../utils/bookshelf.ts");

const User = bookshelf.model("User", {
  tableName: "users",
  blogs() {
    return this.belongsToMany("Blog");
  },
});

module.exports = User;
