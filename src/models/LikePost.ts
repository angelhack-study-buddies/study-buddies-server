import { BelongsTo, DataTypes, Model, Sequelize, BelongsToGetAssociationMixin } from 'sequelize'

import { Post } from './Post'
import { User } from './User'

export class LikePost extends Model {
  public static Post: BelongsTo<LikePost, Post>
  public static User: BelongsTo<LikePost, User>

  public readonly id!: number
  public postID!: number
  public userID!: string

  public getUser: BelongsToGetAssociationMixin<User>
  public getPost: BelongsToGetAssociationMixin<Post>
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
    },
    { sequelize, tableName: 'likepost', timestamps: false },
  )
}

export function associate() {
  LikePost.Post = LikePost.belongsTo(Post, {
    as: 'post',
    foreignKey: 'post_id',
  })

  LikePost.User = LikePost.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id',
  })
}
