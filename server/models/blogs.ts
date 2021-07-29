const bookshelf = require("../utils/bookshelf.ts");

const Blog = bookshelf.model("Blogs", {
  tablelName: "blogs",
  users: function () {
    return this.hasMany("Users");
  },
});

module.exports = Blog;
