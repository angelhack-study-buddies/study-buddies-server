import { DataTypes, Model, Sequelize } from 'sequelize'

export class User extends Model {
  readonly id!: string
  name?: string
  email?: string
  createdAt!: Date
  updatedAt!: Date
  deletedAt?: Date
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
