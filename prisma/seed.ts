import { db } from "../db/config"

async function main() {
  
    await db.$transaction([
         db.mime.create({data: {type: "doc"}}),
         db.mime.create({data: {type: "img"}}),
         db.mime.create({data: {type: "txt"}}),
         db.mime.create({data: {type: "music"}}),
         db.mime.create({data: {type: "video"}}),
         db.mime.create({data: {type: "bin"}}),
         db.mime.create({data: {type: "program"}})
    ]).then((data)=>{
        console.log(data);
        
    }).catch((error)=>{
        console.log(error);
        
    })
}
main()
  .then(async (data) => {
    console.log('ddddddddddddddd');
    
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })