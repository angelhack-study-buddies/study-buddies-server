'use strict'

import fs from 'fs'
import path from 'path'
import { Sequelize, DataTypes } from 'sequelize'
import { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_HOST, MYSQL_PORT } from '../config'

const basename = path.basename(__filename)
const db = {} as any

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD, {
  host: MYSQL_HOST,
  port: Number(MYSQL_PORT),
  dialect: 'mysql',
  logging: false,
  define: { freezeTableName: false },
})

fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts'
  })
  .forEach(file => {
    // @ts-ignore
    const model = require(path.join(__dirname, file)).init(sequelize)
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export { sequelize, Sequelize }
export default db
