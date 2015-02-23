"use strict";

var args = require("yargs").argv;
var path = require("path");
var _    = require("lodash");

module.exports = {
  getStorageMethod: function () {
    return args.storage || "sequelize";
  },

  getStoragePath: function () {
    return args.storagePath || path.join(process.cwd(), "sequelize-meta.json");
  },

  getStorageOptions: function (extraOptions) {
    var options = {};

    if (this.getStorageMethod() === "json") {
      options = { path: this.getStoragePath() };
    }

    if (extraOptions) {
      options = _.assign(options, extraOptions);
    }

    return options;
  }
};
