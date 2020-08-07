const mysqlConfig = {
  host: process.env.DATABASE_HOST || '127.0.0.1',
  port: 3306,
  database: 'db',
  user: 'root',
  password: '123456',
};

const tableName = 'test'; // prod

module.exports = {
  mysqlConfig,
  tableName
}