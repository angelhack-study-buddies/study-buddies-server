import { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_HOST, MYSQL_PORT } from '../config'

module.exports = {
  username: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  dialect: 'mysql',
  dialectOptions: {
    multipleStatements: true,
  },
}
