import React from "react";
import { Box, Flex, Text, Tabs } from "@radix-ui/themes";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import ComponentsPanel from "../ComponentsPanel/ComponentsPanel";
import ChatPanel from "../ChatPanel/ChatPanel";

function SidePanel() {
  return (
    <Box
      p="4"
      height="100%"
      style={{
        background: "var(--gray-2)",
        borderRight: "1px solid var(--gray-6)",
      }}
    >
      <Tabs.Root defaultValue="chat" style={{ height: "100%" }}>
        <Tabs.List mb="4">
          <Tabs.Trigger value="chat" style={{ flex: 1 }}>
            <Flex align="center" gap="2">
              <ChatBubbleIcon />
              <Text size="2">Chat</Text>
            </Flex>
          </Tabs.Trigger>
          <Tabs.Trigger value="components" style={{ flex: 1 }}>
            <Flex align="center" gap="2">
              <Box style={{ fontSize: "14px" }}>🧩</Box>
              <Text size="2">Components</Text>
            </Flex>
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="components">
          <ComponentsPanel />
        </Tabs.Content>

        <Tabs.Content value="chat" style={{ height: "calc(100% - 60px)" }}>
          <ChatPanel />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}

export default SidePanel;
