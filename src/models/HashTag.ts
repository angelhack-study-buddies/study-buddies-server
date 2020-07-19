import { BelongsToMany, BelongsToManyGetAssociationsMixin, DataTypes, Model, Sequelize } from 'sequelize'

import { Post } from './Post'
import { PostHashTagConnection } from './PostHashTagConnection'

export class HashTag extends Model {
  readonly id!: number
  name!: string
  postID!: string
  createdAt!: Date
  updatedAt!: Date
  deletedAt?: Date

  public static Posts: BelongsToMany<HashTag, Post>
  public getPosts!: BelongsToManyGetAssociationsMixin<Post>
}

export function init(sequelize: Sequelize) {
  return HashTag.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      postID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'post_id',
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
    },
    {
      sequelize,
      tableName: 'hashtag',
      timestamps: true,
      charset: 'utf8',
      collate: 'utf8_unicode_ci',
    },
  )
}

export function associate() {
  HashTag.Posts = HashTag.belongsToMany(Post, {
    as: 'posts',
    through: PostHashTagConnection,
    foreignKey: 'hashtagID',
  })

  // HashTag.PostConnection = HashTag.hasMany(PostHashTagConnection, {
  //   as: 'postConnections',
  //   foreignKey: 'hashtagID',
  // })
}
