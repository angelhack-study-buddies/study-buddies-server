import { Sequelize, Model, DataTypes, BelongsTo } from 'sequelize'
import { User } from '../models/User'

export class Follow extends Model {
  public readonly id!: number
  public followingID!: string
  public followerID!: string
  static Follower: BelongsTo<Follow, User>
  static Following: BelongsTo<Follow, User>
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
    },
  )
}

export function associate() {
  Follow.Follower = Follow.belongsTo(User, {
    as: 'follower',
    foreignKey: 'followerID',
  })
  Follow.Following = Follow.belongsTo(User, {
    as: 'following',
    foreignKey: 'followingID',
  })
}
