import React, { useCallback, useRef } from "react";

export type DropMetaData = {
  targetId: string;
  sourceId: string;
  targetElement?: HTMLDivElement | null;
  dropPlacement?: "before" | "after";
} & Record<string, any>;

type Props = {
  id: string;
  children: React.ReactNode;
  onDragEnter?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave?: (
    e: React.DragEvent<HTMLDivElement>,
    dropMetaData: DropMetaData
  ) => void;
  onDragOver?: (
    e: React.DragEvent<HTMLDivElement>,
    dropMetaData: DropMetaData
  ) => void;
  style?: React.CSSProperties;
  dataTranferType?: string;
  onDrop?: (
    e: React.DragEvent<HTMLDivElement>,
    dropMetaData: DropMetaData
  ) => void;
};

function Droppable({
  id,
  children,
  dataTranferType,
  onDragEnter,
  onDragLeave,
  onDrop,
  onDragOver,
  style,
}: Props) {
  const dropTargetRef = useRef<HTMLDivElement>(null);

  const getDropMetaData = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      const sourceId = e.dataTransfer.getData("text/plain");
      const target = dropTargetRef.current;

      let dropMetaData: DropMetaData = {
        targetId: id,
        targetElement: target,
        sourceId,
        other: e.dataTransfer.getData(dataTranferType || "text/plain"),
      };

      if (target) {
        const targetRect = target.getBoundingClientRect();
        if (e.clientY < targetRect.top + targetRect.height / 2) {
          dropMetaData.dropPlacement = "before";
        } else {
          dropMetaData.dropPlacement = "after";
        }
      }

      return dropMetaData;
    },
    [id, dataTranferType]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDragOver?.(e, getDropMetaData(e));
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    onDragLeave?.(e, getDropMetaData(e));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    onDrop?.(e, getDropMetaData(e));
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    onDragEnter?.(e);
  };

  return (
    <div
      id={id}
      ref={dropTargetRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      style={style}
    >
      {children}
    </div>
  );
}

export default Droppable;
