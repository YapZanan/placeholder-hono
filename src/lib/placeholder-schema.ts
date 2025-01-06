import { z } from "zod";

export const placeholderQuerySchema = z.object({
  width: z
    .string()
    .optional()
    .openapi({
      param: {
        name: "width",
        in: "query",
        description: "Width of the placeholder image",
        example: "600",
      },
    }),
  height: z
    .string()
    .optional()
    .openapi({
      param: {
        name: "height",
        in: "query",
        description: "Height of the placeholder image",
        example: "400",
      },
    }),
  text: z
    .string()
    .optional()
    .openapi({
      param: {
        name: "text",
        in: "query",
        description: "Text to display in the placeholder image",
        example: "",
      },
    }),
  font_size: z
    .string()
    .optional()
    .openapi({
      param: {
        name: "font_size",
        in: "query",
        description: "Font size of the text",
        example: "24",
      },
    }),
  bg_color: z
    .string()
    .optional()
    .openapi({
      param: {
        name: "bg_color",
        in: "query",
        description: "Background color of the placeholder image",
        example: "EEEEEEFF",
      },
    }),
  font_color: z
    .string()
    .optional()
    .openapi({
      param: {
        name: "font_color",
        in: "query",
        description: "Font color of the text",
        example: "31343DFF",
      },
    }),
});

export type PlaceholderQueryParams = z.infer<typeof placeholderQuerySchema>;
