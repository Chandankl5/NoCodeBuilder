import React from "react";

type Props = {
  id: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  dataTransfer?: {
    type: string;
    value: string;
  };
  onDragStart?: (
    e: React.DragEvent<HTMLDivElement>,
    meta: {
      targetElement: HTMLDivElement;
    }
  ) => void;
  onDragEnd?: (e: React.DragEvent<HTMLDivElement>) => void;
};

const Draggable = ({
  id,
  children,
  onDragStart,
  onDragEnd,
  style,
  dataTransfer,
}: Props) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (dataTransfer) {
      e.dataTransfer.setData(dataTransfer.type, dataTransfer.value);
    } else {
      e.dataTransfer.setData("text/plain", id);
    }
    onDragStart?.(e, { targetElement: e.target as HTMLDivElement });
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    onDragEnd?.(e);
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      draggable={true}
      id={id}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
      style={style}
    >
      {children}
    </div>
  );
};

export default Draggable;
