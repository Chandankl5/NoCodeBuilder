import { CanvasLayoutType, LayoutTree } from "../types/common";

export interface ILayout {
  type: CanvasLayoutType;
  name: string;
  viewport: {
    width?: number;
  };
}

export const layoutConfig: ILayout[] = [
  { type: "Desktop", name: "Desktop", viewport: {} },
  { type: "Tablet", name: "Tablet", viewport: { width: 768 } },
  { type: "Mobile", name: "Mobile", viewport: { width: 375 } },
];

export const defaultLayoutTree: LayoutTree = {
  root: {
    type: "document",
    id: "document",
    props: {
      className: "container-fluid p-0",
      children: [],
    },
  },
};
