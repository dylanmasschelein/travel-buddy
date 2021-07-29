const bookshelf = require("../utils/bookshelf.ts");

const Blog = bookshelf.model("Blog", {
  tablelName: "blogs",
  users() {
    return this.belongsToMany("User");
  },
});

module.exports = Blog;
