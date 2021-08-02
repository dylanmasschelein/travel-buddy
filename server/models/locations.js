const bookshelf = require("../utils/bookshelf.js");

const Location = bookshelf.model("Location", {
  tableName: "location",
  adventures() {
    return this.hasMany("Adventure");
  },
});

module.exports = Location;
