import {config} from 'dotenv'

config()

export const PORT = process.env.PORT || 3000
export const DB_host= process.env.DB_HOST || "localhost"
export const DB_port = process.env.DB_PORT || 3306
export const DB_user =process.env.DB_USER || "root"
export const DB_password = process.env.DB_PASSWORD  || "root"
export const DB_database =process.env.DB_DATABASE || "test"
