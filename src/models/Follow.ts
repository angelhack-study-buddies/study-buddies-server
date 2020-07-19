import { Sequelize, Model, DataTypes, BelongsTo } from 'sequelize'
import { User } from '../models/User'

export class Follow extends Model {
  public readonly id!: number
  public followingID: string
  public followerID: string
}

export function init(sequelize: Sequelize) {
  Follow.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      followingID: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'following_id',
      },
      followerID: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'follower_id',
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
      tableName: 'follow',
      timestamps: true,
      charset: 'utf8',
      collate: 'utf8_unicode_ci',
    },
  )
}

export function associate() {}
