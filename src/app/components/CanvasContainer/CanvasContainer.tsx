import React, { useState } from "react";
import { Flex } from "@radix-ui/themes";
import { ILayout, layoutConfig } from "../../constants/LayoutTree";
import { CanvasControlPanel } from "./CanvasControlPanel";
import Canvas from "../Canvas/Canvas";

function CanvasContainer() {
  const [selectedLayout, setSelectedLayout] = useState<ILayout>(
    layoutConfig[0]
  );

  const handleSelectLayout = (value: string) => {
    setSelectedLayout(
      layoutConfig.find((layout) => layout.name === value) as ILayout
    );
  };

  return (
    <>
      <CanvasControlPanel
        selectedLayout={selectedLayout}
        handleSelectLayout={handleSelectLayout}
      />
      <Flex
        justify="center"
        height="100%"
        overflow="auto"
        style={{ backgroundColor: "#27272a" }}
      >
        <Canvas selectedLayout={selectedLayout} />
      </Flex>
    </>
  );
}

export default CanvasContainer;
