import { Box, Flex, Text, ScrollArea } from "@radix-ui/themes";
import { UIMessage } from "ai";
import React from "react";
import RenderMessage from "./RenderMessage";

interface ChatMessagesProps {
  messages: UIMessage[];
  isLoading: boolean;
}

function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  return (
    <Box mb="3" style={{ flex: 1, minHeight: "200px" }}>
      <ScrollArea style={{ height: "100%" }}>
        <Flex direction="column" gap="3" p="3">
          {messages.map((message) => (
            <Box
              key={message.id}
              p="3"
              style={{
                background: message.role === "user" ? "var(--blue-4)" : "none",
                border:
                  message.role === "user" ? "1px solid var(--gray-6)" : "none",
                borderRadius: "var(--radius-3)",
                alignSelf: message.role === "user" ? "flex-end" : "flex-start",
                maxWidth: "80%",
              }}
            >
              <RenderMessage message={message} />
            </Box>
          ))}
          {isLoading && (
            <Box
              p="3"
              style={{
                background: "var(--gray-4)",
                border: "1px solid var(--gray-6)",
                borderRadius: "var(--radius-3)",
                alignSelf: "flex-start",
                maxWidth: "80%",
              }}
            >
              <Text
                size="2"
                color="gray"
                style={{
                  fontStyle: "italic",
                }}
              >
                Thinking...
              </Text>
            </Box>
          )}
        </Flex>
      </ScrollArea>
    </Box>
  );
}

export default React.memo(ChatMessages);
