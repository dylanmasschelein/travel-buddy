const bookshelf = require("../utils/bookshelf.js");

const Photo = bookshelf.model("Photo", {
  tableName: "photos",
  adventures() {
    return this.belongsTo("Location");
  },
});

module.exports = Photo;
