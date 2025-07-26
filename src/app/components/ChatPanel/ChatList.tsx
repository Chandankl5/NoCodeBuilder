import React from "react";
import { Box, Flex, Text, ScrollArea } from "@radix-ui/themes";
import { ChatBubbleIcon } from "@radix-ui/react-icons";

interface Chat {
  id: string;
  name: string;
}

interface ChatListProps {
  chats: Chat[];
  activeChatId: string;
  onChatSelect: (chatId: string) => void;
}

function ChatList({ chats, activeChatId, onChatSelect }: ChatListProps) {
  return (
    <Box mb="4" style={{ maxHeight: "140px" }}>
      <Text size="2" weight="medium" mb="3" color="gray">
        Recent Chats
      </Text>
      <ScrollArea style={{ height: "120px" }}>
        <Flex direction="column" gap="3">
          {chats.map((chat) => (
            <Box
              key={chat.id}
              onClick={() => onChatSelect(chat.id)}
              p="3"
              style={{
                background:
                  chat.id === activeChatId
                    ? "linear-gradient(135deg, var(--blue-3) 0%, var(--blue-4) 100%)"
                    : "var(--gray-3)",
                border:
                  chat.id === activeChatId
                    ? "1px solid var(--blue-6)"
                    : "1px solid var(--gray-6)",
                borderRadius: "var(--radius-4)",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Flex align="center" gap="3">
                <Flex
                  align="center"
                  justify="center"
                  style={{
                    background:
                      chat.id === activeChatId
                        ? "var(--blue-9)"
                        : "var(--gray-6)",
                    borderRadius: "50%",
                    width: "32px",
                    height: "32px",
                  }}
                >
                  <ChatBubbleIcon
                    style={{
                      color:
                        chat.id === activeChatId ? "white" : "var(--gray-9)",
                      fontSize: "16px",
                    }}
                  />
                </Flex>
                <Text
                  size="2"
                  weight="medium"
                  color={chat.id === activeChatId ? "blue" : "gray"}
                  style={{ flex: 1 }}
                >
                  {chat.name}
                </Text>
              </Flex>
            </Box>
          ))}
        </Flex>
      </ScrollArea>
    </Box>
  );
}

export default React.memo(ChatList);
