const { Pool } = require("pg");

// PostgreSQL database configuration from the googel doc
const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
});

// Function to insert a sigle token into the database and display the result
async function insertToken(token) {
  // connecting to db
  const client = await pool.connect();
  try {
    await client.query("INSERT INTO secret_tokens (data) VALUES ($1)", [token]);
    console.log(`OK : ${token}`);
  } catch (error) {
    console.log(`ERR: ${token}`);
  } finally {
    client.release();
  }
}

module.exports = insertToken;
