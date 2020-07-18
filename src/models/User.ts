import { DataTypes, Model, Sequelize, HasMany, HasManyGetAssociationsMixin } from 'sequelize'
import { Post } from './Post'

export class User extends Model {
  readonly id!: string
  name?: string
  email?: string
  profileURL?: string
  createdAt!: Date
  updatedAt!: Date
  deletedAt?: Date

  public static Posts: HasMany<User, Post>
  public getPosts!: HasManyGetAssociationsMixin<Post>
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
    foreignKey: 'author_id',
  })
}
