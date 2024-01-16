import { db } from "../db/config"


async function mimeSeeds() {
  return   [
    db.mime.create({ data: { type: "xls" } }),
    db.mime.create({ data: { type: "jpg" } }),
    db.mime.create({ data: { type: "png" } }),
    db.mime.create({ data: { type: "mp4" } }),
    db.mime.create({ data: { type: "mp3" } }),
    db.mime.create({ data: { type: "csv" } }),
    db.mime.create({ data: { type: "exe" } })
  ]
}

async function sourceSeeds() {
  return [
    db.source.createMany({
      data: [
        {
          dir: "/home/aslav3/Documents/Apps/web/sync/test/1",
          userId: 1,
          status: false
        },
        {
          dir: "/home/aslav3/Documents/Apps/web/sync/test/2",
          userId: 2,
          status: false
        }
      ]
    })
  ]
}
async function seedDb(seed: boolean) {

  if (seed) {
    await db.$transaction(await mimeSeeds());
    await db.$transaction(await sourceSeeds())
  }

}

export { seedDb }