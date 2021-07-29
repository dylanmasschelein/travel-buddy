const bookshelf = require("../utils/bookshelf.js");

const Blog = bookshelf.model("Blog", {
  tablelName: "blogs",
  users() {
    return this.hasMany("User");
  },
});

module.exports = Blog;
