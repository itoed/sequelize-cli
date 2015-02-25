"use strict";

var args    = require("yargs").argv;
var path    = require("path");
var _       = require("lodash");
var helpers = require(__dirname);


module.exports = {
  getStorage: function () {
    return helpers.config.readConfig().migrationStorage || "sequelize";
  },

  getStoragePath: function () {
    return helpers.config.readConfig().migrationStoragePath ||
      path.join(process.cwd(), "sequelize-meta.json");
  },

  getStorageOptions: function (extraOptions) {
    var options = {};

    if (this.getStorage() === "json") {
      options.path = this.getStoragePath();
    }

    _.assign(options, extraOptions);

    try {
        console.log("STORAGE: " + this.getStorage());
        console.log(options);
    } catch (e) {
        console.log("Caught! " + e);
        throw new Error("ERROR IS: " + e);
    }

    console.error(options);

    return options;
  }
};
