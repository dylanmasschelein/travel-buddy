const bookshelf = require("../utils/bookshelf.js");

const Comment = bookshelf.model("Comment", {
  tableName: "comments",
  locations() {
    return this.hasMany("Blog");
  },
});

module.exports = Comment;
