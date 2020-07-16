import { DataTypes, Model, Sequelize, BelongsTo, BelongsToGetAssociationMixin } from 'sequelize'
import { User } from './User'

export class Post extends Model {
  readonly id!: string
  authorID!: string
  url!: string
  // hashtagID?: string
  likeCount?: number
  createdAt!: Date
  updatedAt!: Date
  deletedAt?: Date

  public static Author: BelongsTo<Post, User>
  public getAuthor!: BelongsToGetAssociationMixin<User>
}

export function init(sequelize: Sequelize) {
  return Post.init(
    {
      id: {
        type: DataTypes.INTEGER, // google id is out of range in INT
        primaryKey: true,
        autoIncrement: true,
      },
      // hashtagID: {
      //   type: DataTypes.INTEGER,
      //   field: 'hashtag_id',
      // },
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
    foreignKey: 'author_id',
  })
}
