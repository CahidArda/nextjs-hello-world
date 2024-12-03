import { servePagesRouter } from "@upstash/workflow/nextjs";

const LOOP = 50

const { handler } = servePagesRouter(
  async (context) => {
    let j = 0
    for (let i=0; i<LOOP; i++){
      j = await context.run(`step ${i}`, () => {
        console.log(j);
        return j + 1
      })
    }
    console.log("done");
    
  }
)
export default handler;
