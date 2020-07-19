import { BelongsTo, DataTypes, Model, Sequelize, BelongsToGetAssociationMixin } from 'sequelize'

import { Post } from './Post'
import { User } from './User'

export class LikePost extends Model {
  public readonly id!: number
  public postID!: number
  public userID!: string
  public static Post: BelongsTo<LikePost, Post>
  public static User: BelongsTo<LikePost, User>
}

export function init(sequelize: Sequelize) {
  LikePost.init(
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
      userID: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'user_id',
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
      tableName: 'likepost',
      timestamps: true,
    },
  )
}

export function associate() {
  // LikePost.Post = LikePost.belongsTo(Post, {
  //   as: 'post',
  //   foreignKey: 'postID',
  // })
  // LikePost.User = LikePost.belongsTo(User, {
  //   as: 'user',
  //   foreignKey: 'userID',
  // })
}
