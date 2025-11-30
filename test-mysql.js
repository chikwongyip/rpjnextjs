const mysql = require('mysql2/promise');

const credentials = [
  {
    user: 'docker_mysql',
    password: '528478huaHUA@',
    host: 'localhost',
    port: 3306
  }
];

async function testConnection() {
  for (const cred of credentials) {
    try {
      console.log(`Testing ${cred.user}:${cred.password}@${cred.host}...`);
      const connection = await mysql.createConnection(cred);
      console.log(`SUCCESS: Connected with ${cred.user}:${cred.password}`);
      await connection.end();
      process.exit(0);
    } catch (err) {
      console.log(`Failed: ${err.message}`);
    }
  }
  console.log('ALL_FAILED');
  process.exit(1);
}

testConnection();
