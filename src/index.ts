import { serve } from "@hono/node-server";

import app from "@/app";
import env from "@/env-runtime";

const port = env.PORT;
// eslint-disable-next-line no-console
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
