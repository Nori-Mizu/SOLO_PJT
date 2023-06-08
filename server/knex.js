//rootのknexfile.jsを読み込んでDB接続をする
const knex = require("knex");
const config = require("./knexfile");
const environment = process.env.NODE_ENV || "development";
const database = knex(config[environment]);
module.exports = database;

// const environment = "development";
// const config = require("../knexfile.js")[environment];
// const knex = require("knex")(config);

// module.exports = knex;
