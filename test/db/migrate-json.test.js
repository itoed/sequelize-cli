"use strict";

var expect    = require("expect.js");
var Support   = require(__dirname + "/../support");
var helpers   = require(__dirname + "/../support/helpers");
var gulp      = require("gulp");
var fs        = require("fs");
var _         = require("lodash");

([
  "db:migrate --storage='json'"
]).forEach(function(flag) {
  var prepare = function(callback, options) {
    options = _.assign({ config: {} }, options || {});

    var configPath    = "config/config.json";
    var config        = _.assign({}, helpers.getTestConfig(), options.config);
    var migrationFile = "createPerson.js";
    var configContent = JSON.stringify(config);

    gulp
      .src(Support.resolveSupportPath("tmp"))
      .pipe(helpers.clearDirectory())
      .pipe(helpers.runCli("init"))
      .pipe(helpers.removeFile("config/config.json"))
      .pipe(helpers.copyMigration(migrationFile))
      .pipe(helpers.overwriteFile(configContent, configPath))
      .pipe(helpers.runCli(flag, { pipeStdout: true }))
      .pipe(helpers.teardown(callback));
  };

  describe(Support.getTestDialectTeaser(flag), function() {
    it("creates a sequelize-meta.json file", function(done) {
      var jsonFile = Support.resolveSupportPath("tmp", "sequelize-meta.json");

      prepare(function() {
        expect(fs.statSync(jsonFile).isFile()).to.be(true);
        done();
      });
    });

    it("creates the respective table", function(done) {
      var self = this;
      prepare(function() {
        helpers.readTables(self.sequelize, function(tables) {
          expect(tables).to.have.length(1);
          expect(tables).to.contain("Person");
          done();
        });
      });
    });
  });
});
