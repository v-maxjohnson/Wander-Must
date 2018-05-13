require('dotenv').config();

module.exports = {
   development: {
      username: "root",
<<<<<<< HEAD
      password: null,
=======
      password: process.env.MYSQLPASSWORD,
>>>>>>> 480a6d83228893867043807505faddd89b5393f1
      database: "database_development",
      host: "127.0.0.1",
      dialect: "mysql"
    },
    test: {
      username: "root",
      password: null,
      database: "database_test",
      host: "127.0.0.1",
      dialect: "mysql"
    },
    production: {
        use_env_variable: "JAWSDB_URL",
        dialect: "mysql"
    }
}; 