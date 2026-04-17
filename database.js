const { Sequelize } = require('sequelize');
const config = require('./config.json');

let host;
if(process.platform === "linux") { 
    host = "mariadb" //Avox Normal
} else {
    host = "localhost" // Avox Test
}

module.exports = new Sequelize(config.database_name, config.database_username, config.database_password, {
    dialect: 'mariadb',
    host: host,
    logging: false
});