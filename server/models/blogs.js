const bookshelf = require("../utils/bookshelf.js");

const Blog = bookshelf.model("Blog", {
  tableName: "blogs",
  locations() {
    return this.hasMany("Location");
  },
});

module.exports = Blog;
