import { z } from "zod";

import { FontsEnum } from "@/utils/fonts";

const fontEnumValues = Object.values(FontsEnum) as [string, ...string[]];

export const placeholderQuerySchema = z.object({
  width: z
    .string()
    .regex(/^\d+$/, { message: "Width must be a valid number." })
    .refine(value => Number.parseInt(value) <= 2000, {
      message: "Width must be less than or equal to 2000 pixels.",
    })
    .optional()
    .openapi({
      param: {
        name: "width",
        in: "query",
        description: "Width of the placeholder image, specified in pixels. Must be a positive integer and no greater than 1000.",
        example: "600",
      },
    }),

  height: z
    .string()
    .regex(/^\d+$/, { message: "Height must be a valid number." })
    .refine(value => Number.parseInt(value) <= 2000, {
      message: "Height must be less than or equal to 2000 pixels.",
    })
    .optional()
    .openapi({
      param: {
        name: "height",
        in: "query",
        description: "Height of the placeholder image, specified in pixels. Must be a positive integer and no greater than 1000.",
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
        description: "Text to display in the placeholder image.",
        example: "Sample Text",
      },
    }),

  font_size: z
    .string()
    .regex(/^\d+$/, { message: "Font size must be a valid number." })
    .optional()
    .openapi({
      param: {
        name: "font_size",
        in: "query",
        description: "Font size of the text, specified in pixels. Must be a positive integer.",
        example: "24",
      },
    }),

  bg_color: z
    .string()
    .regex(/^([0-9A-F]{6}|[0-9A-F]{8})$/i, {
      message: "Background color must be a valid hex color value (6 or 8 characters, e.g., '31343D' or '31343DFF').",
    })
    .optional()
    .openapi({
      param: {
        name: "bg_color",
        in: "query",
        description: "Background color of the placeholder image, specified in a 6-character or 8-character hexadecimal format (RGB or RGBA).",
        example: "EEEEEEFF",
      },
    }),

  font_color: z
    .string()
    .regex(/^([0-9A-F]{6}|[0-9A-F]{8})$/i, {
      message: "Font color must be a valid hex color value (6 or 8 characters, e.g., '31343D' or '31343DFF').",
    })
    .optional()
    .openapi({
      param: {
        name: "font_color",
        in: "query",
        description: "Font color of the text, specified in a 6-character or 8-character hexadecimal format (RGB or RGBA).",
        example: "31343DFF",
      },
    }),

  font: z
    .enum(fontEnumValues)
    .optional()
    .openapi({
      param: {
        name: "font",
        in: "query",
        description: "Font to use for the placeholder text, specified by one of the available font names.",
        example: "Arial",
      },
    }),

  format: z
    .enum(["svg", "png"])
    .default("png")
    .openapi({
      param: {
        name: "format",
        in: "query",
        description: "Format of the placeholder image. Must be either 'svg' or 'png'.",
        example: "png",
      },
    }),
});

export type PlaceholderQueryParams = z.infer<typeof placeholderQuerySchema>;
