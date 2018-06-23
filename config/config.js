require('dotenv').config();

module.exports = {
  development: {
    username: "root",
    password: process.env.MYSQLPASSWORD,
    database: "database_development",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "testing_db",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql"
  },


}; 