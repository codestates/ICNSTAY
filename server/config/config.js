const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: 'root',
    password: '27035182',
    database: process.env.DATABASE_NAME || 'ICNSTAY',
<<<<<<< Updated upstream
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
=======
<<<<<<< Updated upstream
    host: "127.0.0.1",
=======
    host: '127.0.0.1',
    // port: process.env.DATABASE_PORT,
>>>>>>> Stashed changes
>>>>>>> Stashed changes
    dialect: "mysql"
  },
  test: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || 'ICNSTAY',
<<<<<<< Updated upstream
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
=======
<<<<<<< Updated upstream
    host: "127.0.0.1",
=======
    host: '127.0.0.1',
    // port: process.env.DATABASE_PORT,
>>>>>>> Stashed changes
>>>>>>> Stashed changes
    dialect: "mysql"
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || 'ICNSTAY',
<<<<<<< Updated upstream
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
=======
<<<<<<< Updated upstream
    host: "127.0.0.1",
=======
    host: '127.0.0.1',
    // port: process.env.DATABASE_PORT,
>>>>>>> Stashed changes
>>>>>>> Stashed changes
    dialect: "mysql"
  }
}