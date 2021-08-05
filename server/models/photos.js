const bookshelf = require("../utils/bookshelf.js");

const Photo = bookshelf.model("Photo", {
  tableName: "photos",
  locations() {
    return this.hasMany("Location");
  },
});

module.exports = Photo;
