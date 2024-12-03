import { servePagesRouter } from "@upstash/workflow/nextjs";

const LOOP = 10;

const { handler } = servePagesRouter(async (context) => {
  await context.run("headers", () => {
    console.log(context.headers);
  })

  let j = 0;
  for (let i = 0; i < LOOP; i++) {
    j = await context.run(`step ${i}`, () => {
      console.log(j);
      return j + 1;
    });
  }
});
export default handler