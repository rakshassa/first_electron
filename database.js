
async function read_from_db() {
  const { Client } = require('pg')
  const client = new Client({
    user: 'electron_user',
    host: 'localhost',
    database: 'electron_db',
    password: 'fake_password',
    port: 5432
  })
  try {
    await client.connect()

    // Read values from the HTML form fields
    const name = document.getElementById("lookup_name").value

    // Read from the database
    const query = {
      text: 'SELECT * FROM users WHERE name = $1',
      values: [name],
    }
    const res = await client.query(query)
    console.log("Found email for lookup as: " + res.rows[0].email)

    document.getElementById("lookup_email").value = res.rows[0].email;

    // close the database connection
    await client.end()
  } catch (err) {
   console.log(err.stack)
  }
}

async function save_to_db() {
  const { Client } = require('pg')
  const client = new Client({
    user: 'electron_user',
    host: 'localhost',
    database: 'electron_db',
    password: 'fake_password',
    port: 5432
  })
  try {
    await client.connect()

    // Read values from the HTML form fields
    const name = document.getElementById("subscription_name").value
    const email = document.getElementById("subscription_email").value

    // Write to the database
    const text = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *'
    const values = [name, email]

    const res = await client.query(text, values)
    console.log("Added new user into Database.")

    // close the database connection
    await client.end()
  } catch (err) {
   console.log(err.stack)
  }
}
