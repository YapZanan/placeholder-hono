import { apiReference } from "@scalar/hono-api-reference";

import type { AppOpenAPI } from "./types";

import packageJSON from "../../package.json";

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.1.0",
    info: {
      version: packageJSON.version,
      title: "Placeholder API",
    },
  });

  app.get(
    "/",
    apiReference({
      pageTitle: "Placeholder API Reference",
      theme: "fastify",
      layout: "modern",
      hideSearch: true,
      defaultHttpClient: {
        targetKey: "python",
        clientKey: "requests",
      },
      spec: {
        url: "/doc",
      },
    }),
  );
}
