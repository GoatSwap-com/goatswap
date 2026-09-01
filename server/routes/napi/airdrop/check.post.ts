import { readDb, writeDb } from '../../../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { address } = body || {}

  if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid EVM address format'
    })
  }

  const addr = address.toLowerCase()
  const db = await readDb()

  // If already claimed in DB, return that state
  if (db[addr] && db[addr].claimed) {
    return db[addr]
  }

  // If already exists in DB but not claimed, return that state
  if (db[addr]) {
    return db[addr]
  }

  // Otherwise, register this address with the standard claim amount (1000 SWX)
  const claimAmount = 1000
  const amountWei = (BigInt(claimAmount) * (BigInt("10") ** BigInt("18"))).toString()

  const user = {
    address: addr,
    amount: amountWei,
    index: 0,
    proof: [],
    claimed: false,
    claimedAt: null,
    txHash: null
  }

  db[addr] = user
  await writeDb(db)

  return user
})
