const bookshelf = require("../utils/bookshelf.js");

const Comment = bookshelf.model("Comment", {
  tablelName: "comments",
  comments() {
    return this.belongsToMany("User");
  },
});

module.exports = Comment;
