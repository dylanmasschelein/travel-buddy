const bookshelf = require("../utils/bookshelf.ts");

const Blog = bookshelf.model("Blog", {
  tablelName: "blogs",
});

module.exports = Blog;
