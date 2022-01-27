const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: 'root',
    password: '27035182',
    database: process.env.DATABASE_NAME || 'ICNSTAY',
    host: '127.0.0.1',
    // port: process.env.DATABASE_PORT,
    // host: process.env.DATABASE_HOST,
    dialect: "mysql"
  },
  test: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || 'ICNSTAY',
    host: '127.0.0.1',
    // port: process.env.DATABASE_PORT,
    // host: process.env.DATABASE_HOST,
    dialect: "mysql"
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || 'ICNSTAY',
    host: '127.0.0.1',
    // host: process.env.DATABASE_HOST,
    // port: process.env.DATABASE_PORT,
    dialect: "mysql"
  }
}