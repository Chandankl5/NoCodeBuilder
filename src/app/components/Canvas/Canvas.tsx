import React, { useContext } from "react";
import { ILayout } from "../../constants/LayoutTree";
import { Box } from "@radix-ui/themes";
import { LayoutTree as LayoutTreeType } from "@/app/types/common";
import LayoutRenderer from "./LayoutRenderer";
import { DropMetaData } from "../Droppable/Droppable";
import { insertElement, updateElement } from "../../functions/LayoutTree";
import { CanvasContext } from "../../context/CanvasContext";
import OverlayLoader from "../OverlayLoader/OverlayLoader";

interface Props {
  selectedLayout: ILayout;
}

function Canvas({ selectedLayout }: Props) {
  const { layoutTree, setLayoutTree, isLayoutLoading } =
    useContext(CanvasContext);
  const selectedLayoutWidth = selectedLayout.viewport.width;

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    dropMetaData: DropMetaData,
    action?: "insert" | "update"
  ) => {
    e.stopPropagation();
    const dragMetaData = dropMetaData.other;

    try {
      let parsedData = JSON.parse(dragMetaData);

      if (parsedData && layoutTree.root) {
        setLayoutTree((layoutTreeDraft) => {
          const root = (layoutTreeDraft as LayoutTreeType).root;

          const element = {
            type: parsedData.type,
            children: parsedData.children || [],
          };

          if (action === "insert") {
            insertElement(
              {
                ...element,
                id: crypto.randomUUID(),
              },
              root,
              dropMetaData.targetId,
              dropMetaData.dropPlacement
            );
          } else if (action === "update") {
            updateElement(
              {
                ...element,
                id: parsedData.id,
              },
              root,
              dropMetaData.targetId,
              dropMetaData.dropPlacement
            );
          }
        });
      }
    } catch (error) {
      console.error(error);
    }

    dropMetaData.targetElement?.classList.remove(
      "drag-over-before",
      "drag-over-after"
    );
  };

  const handleInsert = (
    event: React.DragEvent<HTMLDivElement>,
    dropMetaData: DropMetaData
  ) => {
    handleDrop(event, dropMetaData, "insert");
  };

  const handleUpdate = (
    event: React.DragEvent<HTMLDivElement>,
    dropMetaData: DropMetaData
  ) => {
    handleDrop(event, dropMetaData, "update");
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    dropMetaData: DropMetaData
  ) => {
    e.stopPropagation();

    const { targetElement, dropPlacement } = dropMetaData;
    if (dropPlacement === "before") {
      targetElement?.classList.remove("drag-over-after");
      targetElement?.classList.add("drag-over-before");
    } else if (dropPlacement === "after") {
      targetElement?.classList.remove("drag-over-before");
      targetElement?.classList.add("drag-over-after");
    }
  };

  const handleDragLeave = (
    _: React.DragEvent<HTMLDivElement>,
    dropMetaData: DropMetaData
  ) => {
    dropMetaData?.targetElement?.classList.remove(
      "drag-over-before",
      "drag-over-after"
    );
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    meta: {
      targetElement: HTMLDivElement;
    }
  ) => {
    e.stopPropagation();
    meta.targetElement?.classList.remove("hovered");
  };

  return (
    <Box
      position="relative"
      style={{
        width: selectedLayoutWidth ? `${selectedLayoutWidth}px` : "100%",
        background: "white",
        borderRadius: "var(--radius-4)",
        border: "1px solid var(--gray-6)",
      }}
    >
      <LayoutRenderer
        layoutTree={layoutTree}
        onInsert={handleInsert}
        onUpdate={handleUpdate}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragStart={handleDragStart}
      />
      <OverlayLoader isVisible={isLayoutLoading} />
    </Box>
  );
}

export default Canvas;
