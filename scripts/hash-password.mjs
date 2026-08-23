import crypto from 'node:crypto'

const password = process.argv[2]
if (!password) {
  console.error('Cách dùng: node scripts/hash-password.mjs "mat-khau-cua-ban"')
  process.exit(1)
}

const salt = crypto.randomBytes(16).toString('hex')
const hash = crypto.scryptSync(password, salt, 64).toString('hex')
console.log(`${salt}:${hash}`)
