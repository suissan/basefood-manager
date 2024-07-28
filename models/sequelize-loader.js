'use strict';

const Sequelize = require('sequelize');
require("dotenv").config();

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'dpg-cqj4ep2j1k6c739mispg-a',
    database: 'base_iri6',
    username: 'suimox7',
    password: 'koqKBVW21leJb05ZZB9ri8FfWLIbDuuB',
  });

module.exports = {
    database: sequelize,
    Sequelize: Sequelize
};
