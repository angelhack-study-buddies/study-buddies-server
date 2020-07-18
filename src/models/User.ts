import {
  DataTypes,
  Model,
  Sequelize,
  HasMany,
  HasManyGetAssociationsMixin,
  BelongsToMany,
  BelongsToManyGetAssociationsMixin,
} from 'sequelize'
import { Post } from './Post'
import { LikePost } from './LikePost'
import { Follow } from './Follow'

export class User extends Model {
  readonly id!: string
  public name?: string
  public email?: string
  public profileURL?: string
  public createdAt!: Date
  public updatedAt!: Date
  public deletedAt?: Date
  static Posts: HasMany<User, Post>
  public getPosts: HasManyGetAssociationsMixin<Post>

  public static PostsLike: BelongsToMany<User, Post>
  public getPostsLike!: BelongsToManyGetAssociationsMixin<Post>

  static Followers: HasMany<User, User>
  public getFollowers: HasManyGetAssociationsMixin<User>

  static Followings: HasMany<User, User>
  public getFollowings: HasManyGetAssociationsMixin<User>

  public static LikePost: HasMany<User, LikePost>
  // public getLikePosts: HasManyGetAssociationsMixin<LikePost>
}

export function init(sequelize: Sequelize) {
  return User.init(
    {
      id: {
        type: DataTypes.STRING, // google id is out of range in INT
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      profileURL: {
        type: DataTypes.STRING,
        field: 'profile_url',
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
      tableName: 'user',
      timestamps: true,
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_unicode_ci',
    },
  )
}

export function associate() {
  User.Posts = User.hasMany(Post, {
    as: 'posts',
    foreignKey: 'authorID',
  })
  User.Followers = User.belongsToMany(User, {
    as: 'followers',
    through: Follow,
    foreignKey: 'followingID',
    // sourceKey: 'id',
  })

  User.Followings = User.belongsToMany(User, {
    as: 'followings',
    through: Follow,
    foreignKey: 'followerID',
    // sourceKey: 'id',
  })
  // User.FollowerConnection = User.hasMany(Follow, {
  //   as: 'followerConnection',
  //   foreignKey: 'followerID',
  //   sourceKey: 'id',
  // })
  // User.FollowingConnection = User.hasMany(Follow, {
  //   as: 'followingConnection',
  //   foreignKey: 'followingID',
  //   sourceKey: 'id',
  // })
  // User.PostsLike = User.belongsToMany(Post, {
  //   as: 'postsLike',
  //   through: LikePost,
  //   foreignKey: 'authorID',
  //   otherKey: 'postID',
  // })
  // User.LikePost = User.hasMany(LikePost, {
  //   as: 'likePost',
  //   foreignKey: 'authorID',
  // })
}
