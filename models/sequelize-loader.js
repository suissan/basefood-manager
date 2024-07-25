const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'postgres://suimox7:postgres@localhost/base'
);

module.exports = {
    database: sequelize,
    Sequelize: Sequelize
};