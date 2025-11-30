const mysql = require('mysql2/promise');

async function checkTables() {
  try {
    const connection = await mysql.createConnection({
      user: 'docker_mysql',
      password: '528478huaHUA@',
      host: 'localhost',
      port: 3306,
      database: 'rpj_1' // Updated database name
    });

    const [tables] = await connection.query('SHOW TABLES');
    console.log('Tables in database rpj_1:');
    tables.forEach((row) => {
      console.log('-', Object.values(row)[0]);
    });

    // Also check table count
    console.log(`\nTotal tables: ${tables.length}`);

    await connection.end();
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

checkTables();
