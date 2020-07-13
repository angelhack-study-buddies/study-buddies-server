import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '../.env') })

// Add environment variables from .env
export const MY_NAME = process.env.MY_NAME
