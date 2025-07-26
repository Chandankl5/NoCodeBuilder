import { createTool } from "@mastra/core/tools";

export const layoutTypeDefsTool = createTool({
  id: "GetLayoutTypeDefJSON",
  description: "Get the layout tree (LayoutTree) type definitions",
  execute: async () => {
    return {
      $schema: "http://json-schema.org/draft-07/schema#",
      definitions: {
        CanvasElementProps: {
          type: "object",
          additionalProperties: true,
          properties: {
            attributes: {
              type: "object",
              additionalProperties: true,
            },
            style: {
              type: "array",
              items: { $ref: "#/definitions/StyleProps" },
            },
            children: {
              oneOf: [
                {
                  type: "array",
                  items: { $ref: "#/definitions/CanvasElement" },
                },
                { type: "string" },
                { type: "number" },
                { type: "boolean" },
                { type: "null" },
              ],
            },
          },
        },
        CanvasElement: {
          type: "object",
          required: ["type", "id"],
          properties: {
            type: {
              type: "string",
              description: "One of the ENUMS mentioned in ComponentsListTool",
            },
            id: {
              type: "string",
            },
            props: { $ref: "#/definitions/CanvasElementProps" },
          },
          additionalProperties: false,
        },
        StyleProps: {
          type: "object",
          required: ["type", "properties"],
          properties: {
            type: {
              type: "string",
              enum: [
                "layout",
                "typography",
                "spacing",
                "background",
                "border",
                "size",
              ],
            },
            properties: {
              type: "object",
              description: "Any valid CSSProperties object",
            },
          },
          additionalProperties: false,
        },
        LayoutTree: {
          type: "object",
          properties: {
            root: {
              oneOf: [
                { $ref: "#/definitions/CanvasElement" },
                { type: "null" },
              ],
            },
          },
          required: ["root"],
          additionalProperties: false,
        },
      },
      type: "object",
      properties: {
        layoutTree: { $ref: "#/definitions/LayoutTree" },
      },
      required: ["layoutTree"],
      additionalProperties: false,
    };
  },
});
