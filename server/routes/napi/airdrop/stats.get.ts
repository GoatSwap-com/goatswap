import { readDb } from '../../../utils/db'

export default defineEventHandler(async () => {
  const baseRecipients = 12480
  const baseClaimedTokens = BigInt("16800000") // 16.8M tokens base
  const totalAirdrop = 40000000 // 40M tokens

  const db = await readDb()
  const dbSize = Object.keys(db).length

  let extraClaimedWei = BigInt("0")
  for (const user of Object.values(db)) {
    if (user.claimed) {
      extraClaimedWei += BigInt(user.amount)
    }
  }

  const baseClaimedWei = baseClaimedTokens * (BigInt("10") ** BigInt("18"))
  const totalClaimedWei = baseClaimedWei + extraClaimedWei
  const totalAirdropWei = BigInt(totalAirdrop) * (BigInt("10") ** BigInt("18"))

  // Calculate percentage: (totalClaimedWei * 10000) / totalAirdropWei -> percentage with 2 decimals
  const pctTenThousandths = Number((totalClaimedWei * BigInt("10000")) / totalAirdropWei)
  const claimedPct = Math.min(100, pctTenThousandths / 100)

  return {
    totalAirdrop,
    recipientCount: baseRecipients + dbSize,
    claimedPct,
    deadlineDays: 30
  }
})
