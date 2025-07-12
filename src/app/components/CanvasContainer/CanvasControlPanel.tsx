import React from "react";
import { Dialog, Flex, Select, Button } from "@radix-ui/themes";
import { ILayout, layoutConfig } from "../../constants/LayoutTree";
import CodeIcon from "@mui/icons-material/Code";
import DocumentCodeView from "../DocumentCodeView/DocumentCodeView";

interface Props {
  selectedLayout: ILayout;
  handleSelectLayout: (value: string) => void;
}

export const CanvasControlPanel = ({
  selectedLayout,
  handleSelectLayout,
}: Props) => {
  return (
    <Flex
      align="center"
      justify="between"
      px="4"
      py="3"
      style={{
        background: "var(--gray-2)",
        borderBottom: "1px solid var(--gray-6)",
        boxShadow: "var(--shadow-2)",
      }}
    >
      <Flex align="center" gap="4">
        <Select.Root
          value={selectedLayout.name}
          onValueChange={handleSelectLayout}
        >
          <Select.Trigger
            style={{
              background: "var(--gray-3)",
              border: "1px solid var(--gray-7)",
              borderRadius: "var(--radius-2)",
              padding: "8px 12px",
              minWidth: "120px",
            }}
          >
            {selectedLayout.name}
          </Select.Trigger>
          <Select.Content>
            {layoutConfig.map((layout) => (
              <Select.Item key={layout.type} value={layout.name}>
                {layout.name}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Flex>

      <Flex align="center" gap="2">
        <Dialog.Root>
          <Dialog.Trigger>
            <Button
              variant="soft"
              size="2"
              style={{
                background: "var(--gray-4)",
                border: "1px solid var(--gray-7)",
                cursor: "pointer",
              }}
            >
              <CodeIcon style={{ fontSize: "16px", marginRight: "6px" }} />
              Code
            </Button>
          </Dialog.Trigger>
          <Dialog.Content maxWidth="80%">
            <Dialog.Title
              weight="medium"
              style={{
                color: "var(--gray-11)",
                fontSize: "18px",
                marginBottom: "16px",
              }}
            >
              Generated Code
            </Dialog.Title>
            <DocumentCodeView />
          </Dialog.Content>
        </Dialog.Root>
      </Flex>
    </Flex>
  );
};
