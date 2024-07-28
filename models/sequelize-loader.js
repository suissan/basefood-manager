'use strict';

const Sequelize = require('sequelize');
require("dotenv").config();

const sequelize = new Sequelize(
    'postgres://suimox7:postgres@localhost/base'
);

module.exports = {
    database: sequelize,
    Sequelize: Sequelize
};
