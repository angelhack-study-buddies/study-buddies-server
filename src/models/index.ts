'use strict'

import { Sequelize } from 'sequelize'
import { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_HOST, MYSQL_PORT } from '../config'
import { init as initFollow, associate as associateFollow } from '../models/Follow'
import { init as initHashTag, associate as associateHashTag } from '../models/HashTag'
import { init as initLikePost, associate as associateLikePost } from '../models/LikePost'
import { init as initPost, associate as associatePost } from '../models/Post'
import {
  init as initPostHashTagConnection,
  associate as associatePostHashTagConnection,
} from '../models/PostHashTagConnection'
import { init as initUser, associate as associateUser } from '../models/User'

export async function sequelizeInit() {
  const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD, {
    host: MYSQL_HOST,
    port: Number(MYSQL_PORT),
    dialect: 'mysql',
    // logging: console.log,
    logging: false,
    define: { freezeTableName: false },
  })

  initUser(sequelize)
  initPost(sequelize)
  initHashTag(sequelize)
  initFollow(sequelize)
  initLikePost(sequelize)
  initPostHashTagConnection(sequelize)

  associateUser()
  associatePost()
  associateHashTag()
  associateFollow()
  associateLikePost()
  associatePostHashTagConnection()

  await sequelize.sync()
  return sequelize
}
