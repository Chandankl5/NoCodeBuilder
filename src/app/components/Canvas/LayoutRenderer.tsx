import {
  CanvasElement,
  LayoutTree,
  StyleProps,
  OnInsertType,
  OnUpdateType,
  OnDragOverType,
  OnDragLeaveType,
  OnDragStartType,
} from "@/app/types/common";
import { Attributes } from "react";
import Droppable from "../Droppable/Droppable";
import Draggable from "../Draggable/Draggable";
import RenderType from "./RenderType";

interface Props {
  layoutTree: LayoutTree;
  onInsert: OnInsertType;
  onUpdate: OnUpdateType;
  onDragOver: OnDragOverType;
  onDragLeave: OnDragLeaveType;
  onDragStart: OnDragStartType;
}

interface LayoutRendererItemProps {
  element: CanvasElement;
  onInsert: OnInsertType;
  onUpdate: OnUpdateType;
  onDragOver: OnDragOverType;
  onDragLeave: OnDragLeaveType;
  onDragStart: OnDragStartType;
}

function LayoutRenderer({
  layoutTree,
  onInsert,
  onUpdate,
  onDragOver,
  onDragLeave,
  onDragStart,
}: Props) {
  const root = layoutTree.root;

  if (!root) return null;

  return (
    <LayoutRendererItem
      element={root}
      onInsert={onInsert}
      onUpdate={onUpdate}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDragStart={onDragStart}
    />
  );
}

function LayoutRendererItem({
  element,
  onInsert,
  onUpdate,
  onDragOver,
  onDragLeave,
  onDragStart,
}: LayoutRendererItemProps) {
  const { id, props, children = [] } = element;
  const style = props?.style;
  const styleProps = style?.reduce((acc, curr) => {
    return {
      ...acc,
      ...curr.properties,
    };
  }, {} as StyleProps);

  const attributes = props?.attributes ?? ({} as Attributes);

  const elementProps = {
    id: id,
    style: styleProps,
    ...attributes,
  };

  const childrenElements = Array.isArray(children)
    ? children.map((child) => (
        <Droppable
          id={child.id}
          key={child.id}
          dataTranferType="application/json"
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={(e, dropMetaData) => {
            e.stopPropagation();
            onUpdate(e, dropMetaData);
          }}
        >
          <Draggable
            id={child.id}
            onDragStart={onDragStart}
            dataTransfer={{
              type: "application/json",
              value: JSON.stringify({ ...child, action: "update" }),
            }}
          >
            <LayoutRendererItem
              key={child.id}
              element={child}
              onInsert={onInsert}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDragStart={onDragStart}
              onUpdate={(e, dropMetaData) => {
                e.stopPropagation();
                onUpdate(e, dropMetaData);
              }}
            />
          </Draggable>
        </Droppable>
      ))
    : children;

  return (
    <RenderType
      element={element}
      elementProps={elementProps}
      childrenElements={childrenElements}
      onInsert={onInsert}
      onUpdate={onUpdate}
    />
  );
}

export default LayoutRenderer;
