'use strict';

const Sequelize = require('sequelize');
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DATABASE_URL || 'postgres://suimox7:postgres@localhost/base'
);

module.exports = {
    database: sequelize,
    Sequelize: Sequelize
};
