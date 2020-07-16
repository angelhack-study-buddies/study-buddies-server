import { Sequelize, Model, DataTypes, BelongsTo } from 'sequelize'
import { HashTag } from './HashTag'
import { Post } from './Post'

export class PostHashTagConnection extends Model {
  public static Post: BelongsTo<PostHashTagConnection, Post>
  public static HashTag: BelongsTo<PostHashTagConnection, HashTag>

  public readonly id!: number
  public postID!: number
  public hashtagID!: number
}

export function init(sequelize: Sequelize) {
  PostHashTagConnection.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      postID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'post_id',
      },
      hashtagID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'hashtag_id',
      },
    },
    {
      sequelize,
      tableName: 'post_hashtag_connection',
      timestamps: false,
    },
  )
}

export function associate() {
  PostHashTagConnection.Post = PostHashTagConnection.belongsTo(Post, {
    as: 'post',
    foreignKey: 'post_id',
  })

  PostHashTagConnection.HashTag = PostHashTagConnection.belongsTo(HashTag, {
    as: 'hashtag',
    foreignKey: 'hashtag_id',
  })
}
