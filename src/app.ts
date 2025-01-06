import createApp from "@/lib/create-app";
import placeholder from "@/routes/placeholder/placeholder.route";

import configureOpenAPI from "./lib/configure-openapi";

const app = createApp();

const routes = [placeholder];
configureOpenAPI(app);
routes.forEach((route) => {
  app.route("/", route);
});

export default app;
