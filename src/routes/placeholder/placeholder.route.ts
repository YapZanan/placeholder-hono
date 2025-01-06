// src/routes/placeholder/placeholder.route.ts
import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

import { createRouter } from "@/lib/create-app";
import { placeholderQuerySchema } from "@/lib/placeholder-schema";
import { placeholderHandler } from "@/routes/placeholder/placeholder.handler";

const router = createRouter().openapi(
  createRoute({
    tags: ["Placeholder"],
    method: "get",
    path: "/placeholder",
    request: {
      query: placeholderQuerySchema.openapi("PlaceholderQueryParams"),
    },
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        createMessageObjectSchema("Returns a placeholder image as SVG"),
        "Placeholder image generated successfully.",
      ),
    },
  }),
  placeholderHandler,
);

export default router;
