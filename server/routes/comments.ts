const bookshelf = require("../utils/bookshelf.ts");

const Comment = bookshelf.model("Comment", {
  tablelName: "comments",
  comments() {
    return this.belongsToMany("User");
  },
});

module.exports = Blog;
