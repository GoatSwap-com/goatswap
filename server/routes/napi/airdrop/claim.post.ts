import { readDb, writeDb } from '../../../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { address, txHash } = body || {}

  if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid EVM address format'
    })
  }

  const addr = address.toLowerCase()
  const db = await readDb()

  if (!db[addr]) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User address not found in eligibility list'
    })
  }

  db[addr].claimed = true
  db[addr].claimedAt = new Date().toISOString()
  db[addr].txHash = txHash || null

  await writeDb(db)

  return {
    success: true,
    user: db[addr]
  }
})
