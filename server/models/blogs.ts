const bookshelf = require("../utils/database.ts");

const Blog = bookshelf.model("Blog", {
  tablelName: "blogs",
});

module.exports = Blog;
