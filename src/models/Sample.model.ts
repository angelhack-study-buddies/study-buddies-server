import { Sequelize, DataTypes, Model } from 'sequelize'
import { sequelize } from './index'

export class Sample extends Model {
  readonly id!: string
  name?: string
  createdAt!: Date
  updatedAt!: Date
  deletedAt?: Date
}

export function init(sequelize: Sequelize) {
  return Sample.init(
    {
      name: {
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
      tableName: 'sample_table',
      timestamps: true, // createdAt, updatedAt
      paranoid: true, // deletedAt
    },
  )
}
