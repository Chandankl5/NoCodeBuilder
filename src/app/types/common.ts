import { CSSProperties } from "react";
import { DropMetaData } from "../components/Droppable/Droppable";

export interface CanvasElementProps extends Record<string, any> {
  attributes?: Record<string, any>;
  style?: StyleProps[];
  children?: CanvasElement[] | string | number | boolean | null;
}

export interface CanvasElement {
  type: HTMLElement["tagName"];
  id: string;
  props?: CanvasElementProps;
}

export type StyleGroupType =
  | "layout"
  | "typography"
  | "spacing"
  | "background"
  | "border"
  | "size";

export interface StyleProps {
  type: StyleGroupType;
  properties: CSSProperties;
}

export interface LayoutTree {
  root: CanvasElement | null;
}

export interface CanvasAction {
  type: "undo" | "redo";
  enabled: boolean;
  onAction: () => void;
}

export type CanvasLayoutType = "Mobile" | "Tablet" | "Desktop";

export interface CanvasContext {
  layoutTree: LayoutTree;
  selectedlayout: CanvasLayoutType;
  actions: CanvasAction[];
}

export interface StyleProperty {
  name: string;
  label: string;
  description: string;
  enums?: string[];
  units?: string[];
}

export interface StyleProperties {
  type: "layout" | "typography" | "spacing" | "background" | "border" | "size";
  properties: StyleProperty[];
}

export interface ILayout {
  type: CanvasLayoutType;
  name: string;
  viewport: {
    width?: number;
  };
}

export type OnInsertType = (
  e: React.DragEvent<HTMLDivElement>,
  dropMetaData: DropMetaData
) => void;

export type OnUpdateType = (
  e: React.DragEvent<HTMLDivElement>,
  dropMetaData: DropMetaData
) => void;

export type OnDragOverType = (
  e: React.DragEvent<HTMLDivElement>,
  dropMetaData: DropMetaData
) => void;

export type OnDragLeaveType = (
  e: React.DragEvent<HTMLDivElement>,
  dropMetaData: DropMetaData
) => void;

export type OnDragStartType = (
  e: React.DragEvent<HTMLDivElement>,
  meta: {
    targetElement: HTMLDivElement;
  }
) => void;
