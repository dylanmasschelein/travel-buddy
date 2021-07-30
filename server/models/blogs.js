const bookshelf = require("../utils/bookshelf.js");

const Blog = bookshelf.model("Blog", {
  tableName: "blogs",
  users() {
    return this.hasMany("User");
  },
});

module.exports = Blog;
