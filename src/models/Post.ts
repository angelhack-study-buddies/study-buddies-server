import {
  BelongsTo,
  BelongsToGetAssociationMixin,
  BelongsToMany,
  BelongsToManyGetAssociationsMixin,
  DataTypes,
  HasMany,
  HasManyGetAssociationsMixin,
  Model,
  Sequelize,
} from 'sequelize'

import { HashTag } from './HashTag'
import { LikePost } from './LikePost'
import { PostHashTagConnection } from './PostHashTagConnection'
import { User } from './User'

export class Post extends Model {
  readonly id!: number
  authorID!: string
  url?: string
  likeCount?: number
  createdAt!: Date
  updatedAt!: Date
  deletedAt?: Date

  static Author: BelongsTo<Post, User>
  public getAuthor: BelongsToGetAssociationMixin<User>

  static UsersLike: BelongsToMany<Post, User>
  public getUsersLike!: BelongsToManyGetAssociationsMixin<User>

  static HashTags: BelongsToMany<Post, HashTag>
  public getHashTags: BelongsToManyGetAssociationsMixin<HashTag>

  static LikePost: HasMany<Post, LikePost>
  public getLikePosts: HasManyGetAssociationsMixin<LikePost>
}

export function init(sequelize: Sequelize) {
  return Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      authorID: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'author_id',
      },
      url: {
        // https://stackoverflow.com/questions/29458445/what-is-a-safe-maximum-length-a-segment-in-a-url-path-should-be/33733386
        type: DataTypes.TEXT,
      },
      likeCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        field: 'like_count',
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at',
      },
    },
    {
      sequelize,
      tableName: 'post',
      timestamps: true,
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_unicode_ci',
    },
  )
}

export function associate() {
  Post.Author = Post.belongsTo(User, {
    as: 'author',
    foreignKey: 'authorID',
  })
  Post.HashTags = Post.belongsToMany(HashTag, {
    as: 'hashtags',
    through: PostHashTagConnection,
    foreignKey: 'postID',
  })
  // Post.UsersLike = Post.belongsToMany(User, {
  //   as: 'usersLike',
  //   through: LikePost,
  //   foreignKey: 'postID',
  //   otherKey: 'authorID',
  // })
  // Post.LikePost = Post.hasMany(LikePost, {
  //   as: 'likePost',
  //   foreignKey: 'postID',
  // })
}
