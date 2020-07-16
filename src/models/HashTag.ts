import {
  DataTypes,
  Model,
  Sequelize,
  HasMany,
  BelongsToMany,
  BelongsToManyGetAssociationsMixin,
} from 'sequelize'
import { Post } from './Post'
import { PostHashTagConnection } from './PostHashTagConnection'

export class HashTag extends Model {
  readonly id!: number
  name!: string
  postID!: string
  createdAt!: Date
  updatedAt!: Date
  deletedAt?: Date

  public static Post: BelongsToMany<HashTag, Post>
  public static PostConnection: HasMany<HashTag, PostHashTagConnection>
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
  HashTag.Post = HashTag.belongsToMany(Post, {
    as: 'posts',
    through: PostHashTagConnection,
    foreignKey: 'hashtag_id',
    otherKey: 'post_id',
  })

  HashTag.PostConnection = HashTag.hasMany(PostHashTagConnection, {
    as: 'postConnections',
    foreignKey: 'hashtag_id',
  })
}
