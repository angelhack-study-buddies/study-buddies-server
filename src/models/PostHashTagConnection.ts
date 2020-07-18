import { BelongsTo, DataTypes, Model, Sequelize } from 'sequelize'

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
      tableName: 'post_hashtag_connection',
      timestamps: true,
    },
  )
}

export function associate() {
  PostHashTagConnection.Post = PostHashTagConnection.belongsTo(Post, {
    as: 'post',
    foreignKey: 'postID',
  })

  PostHashTagConnection.HashTag = PostHashTagConnection.belongsTo(HashTag, {
    as: 'hashtag',
    foreignKey: 'hashtagID',
  })
}
