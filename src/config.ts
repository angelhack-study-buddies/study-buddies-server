import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '../.env') })

// Add environment variables from .env
export const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'studybuddies'
export const MYSQL_HOST = process.env.MYSQL_HOST || '127.0.0.1'
export const MYSQL_PORT = process.env.MYSQL_PORT || 9876
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || '1234'
export const MYSQL_USERNAME = process.env.MYSQL_USERNAME || 'root'
export const NODE_ENV = process.env.NODE_ENV || 'development'
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'development'
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'development'
export const SERVER_BASE_URL = process.env.SERVER_BASE_URL || 'http://localhost:3000'
