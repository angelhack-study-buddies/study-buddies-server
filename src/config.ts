import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '../.env') })

// Add environment variables from .env
export const MYSQL_DATABASE = process.env.MYSQL_DATABASE
export const MYSQL_HOST = process.env.MYSQL_HOST
export const MYSQL_PORT = process.env.MYSQL_PORT
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD
export const MYSQL_USERNAME = process.env.MYSQL_USERNAME
