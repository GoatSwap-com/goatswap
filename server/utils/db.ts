import fs from 'node:fs/promises'
import path from 'node:path'

const dbPath = path.resolve(process.cwd(), 'server/data/airdrop-users.json')

let writeQueue: Promise<any> = Promise.resolve()

export interface AirdropUser {
  address: string
  amount: string // allocation in Wei (decimal string)
  index: number
  proof: string[]
  claimed: boolean
  claimedAt: string | null
  txHash: string | null
}

export interface AirdropDatabase {
  [address: string]: AirdropUser
}

export async function readDb(): Promise<AirdropDatabase> {
  try {
    const data = await fs.readFile(dbPath, 'utf-8')
    return JSON.parse(data)
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      return {}
    }
    throw err
  }
}

export async function writeDb(data: AirdropDatabase): Promise<void> {
  const nextWrite = writeQueue.then(async () => {
    await fs.mkdir(path.dirname(dbPath), { recursive: true })
    const tempPath = `${dbPath}.tmp`
    await fs.writeFile(tempPath, JSON.stringify(data, null, 2), 'utf-8')
    await fs.rename(tempPath, dbPath)
  })
  writeQueue = nextWrite
  return nextWrite
}
