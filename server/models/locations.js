const bookshelf = require("../utils/bookshelf.js");

const Location = bookshelf.model("Location", {
  tableName: "location",
  adventures() {
    return this.belongsTo("Adventure");
  },
});

module.exports = Location;
