const express = require('express');
const cors = require('cors');
// const https = require('https');
const fs = require('fs');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();
const app = express();
const router = require('./router');

const clientUrl = process.env.CLIENT_URL || 'https://localhost:3000';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: clientUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

app.use(cookieParser());

app.use('/', router);

const serverPort = process.env.SERVER_PORT || 4000;

// let server;

// const privateKey = fs.readFileSync(__dirname + '/../key.pem', 'utf-8');
// const certificate = fs.readFileSync(__dirname + '/../cert.pem', 'utf-8');

// server = https.createServer(
//   {
//     key: privateKey,
//     cert: certificate,
//   },
//   app
// );

app.listen(serverPort, () => {
  console.log(`Server running at ${serverPort} port`);
});

// module.exports = server;
