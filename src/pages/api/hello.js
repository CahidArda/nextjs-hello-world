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
  console.log("done");
});

const removeHeadersMiddleware = (req, res) => {
  // Clone the request headers and remove specific ones
  const headers = { ...req.headersDistinct };
  delete headers["Rndr-Id"];
  delete headers["rndr-id"];

  // Create a new Request object with the modified headers
  req.headersDistinct = headers;

  // Forward the sanitized request to the original handler
  return handler(req, res);
};

export default removeHeadersMiddleware;
