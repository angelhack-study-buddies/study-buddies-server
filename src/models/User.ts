import { DataTypes, Model, Sequelize } from 'sequelize'

export class User extends Model {
    readonly id!:string
    name?: string
	email!: string
}

export function init(sequelize: Sequelize) {
    return User.init(
      {
        name: {
          type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        tableName: 'User',
      },
    )
  }
  