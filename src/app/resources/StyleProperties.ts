import { StyleProperties } from "../types/common";

export const styleProperties: StyleProperties[] = [
  {
    type: "layout",
    properties: [
      {
        name: "position",
        label: "Position",
        enums: ["static", "relative", "absolute", "fixed", "sticky"],
        description: "The positioning of the element",
      },
    ],
  },
  {
    type: "spacing",
    properties: [
      {
        name: "margin",
        label: "Margin",
        description: "The spacing around the element",
        units: ["px", "rem", "em", "%", "vh", "vw"],
      },
      {
        name: "padding",
        label: "Padding",
        description: "The spacing inside the element",
        units: ["px", "rem", "em", "%", "vh", "vw"],
      },
    ],
  },
  {
    type: "typography",
    properties: [
      {
        name: "fontSize",
        label: "Font Size",
        description: "The size of the font",
        units: ["px", "rem", "em", "%"],
      },
      {
        name: "fontWeight",
        label: "Font Weight",
        description: "The weight of the font",
        enums: ["normal", "bold", "lighter", "bolder"],
      },
      {
        name: "color",
        label: "Color",
        description: "The color of the text",
      },
      {
        name: "textAlign",
        label: "Text Align",
        description: "The alignment of the text",
        enums: ["left", "center", "right", "justify"],
      },
    ],
  },
  {
    type: "size",
    properties: [
      {
        name: "width",
        label: "Width",
        description: "The width of the element",
        units: ["px", "rem", "em", "%", "vh", "vw"],
      },
      {
        name: "height",
        label: "Height",
        description: "The height of the element",
        units: ["px", "rem", "em", "%", "vh", "vw"],
      },
      {
        name: "minWidth",
        label: "Min Width",
        description: "The minimum width of the element",
        units: ["px", "rem", "em", "%", "vh", "vw"],
      },
      {
        name: "maxWidth",
        label: "Max Width",
        description: "The maximum width of the element",
        units: ["px", "rem", "em", "%", "vh", "vw"],
      },
      {
        name: "minHeight",
        label: "Min Height",
        description: "The minimum height of the element",
        units: ["px", "rem", "em", "%", "vh", "vw"],
      },
      {
        name: "maxHeight",
        label: "Max Height",
        description: "The maximum height of the element",
        units: ["px", "rem", "em", "%", "vh", "vw"],
      },
    ],
  },
  {
    type: "border",
    properties: [
      {
        name: "borderWidth",
        label: "Border Width",
        description: "The width of the border",
        units: ["px", "rem", "em", "%", "vh", "vw"],
      },
      {
        name: "borderStyle",
        label: "Border Style",
        description: "The style of the border",
        enums: [
          "solid",
          "dashed",
          "dotted",
          "double",
          "groove",
          "ridge",
          "inset",
          "outset",
        ],
      },
      {
        name: "borderColor",
        label: "Border Color",
        description: "The color of the border",
      },
      {
        name: "borderRadius",
        label: "Border Radius",
        description: "The radius of the border",
        units: ["px", "rem", "em", "%", "vh", "vw"],
      },
    ],
  },
  {
    type: "background",
    properties: [
      {
        name: "backgroundColor",
        label: "Background Color",
        description: "The color of the background",
      },
    ],
  },
];
