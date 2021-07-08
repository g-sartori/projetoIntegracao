const mongoose = require('mongoose');

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env

async function db() {
  mongoose.connect(
    `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  mongoose.connection.on('error', () => console.error('Connection error:'));
  mongoose.connection.once('open', () => console.log('Database connected as %s on %s:%s/%s', DB_USER, DB_HOST, DB_PORT, DB_NAME));
  mongoose.Promise = global.Promise;
}

db();

module.exports = mongoose