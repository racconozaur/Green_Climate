import * as dotenv from 'dotenv'
import * as process from 'process'

dotenv.config()

function getRequiredEnv(key: string): string {
  const value = process.env[key]
  if (!value) throw new Error(`${key} env variable must be set`)
  return value
}

function parseUrl(key: string): string {
  const value = process.env[key]

  if (!value) return null

  return value.endsWith('/') ? value.slice(0, -1) : value
}

const Configuration = {
  PORT: parseInt(process.env.PORT) || 3000,
  DATABASE_URL: getRequiredEnv('DATABASE_URL'),
  USER_JWT_SECRET: getRequiredEnv('USER_JWT_SECRET'),
  SALT_ROUND: parseInt(getRequiredEnv('SALT_ROUND')),
  IMAGE_URL: parseUrl('IMAGE_URL'),
}

export default Configuration
