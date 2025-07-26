import React, { useContext, useEffect, useState } from "react";
import { Flex, Text, Button } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";
import { useChat } from "@ai-sdk/react";
import ChatList from "./ChatList";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import { CanvasContext } from "@/app/context/CanvasContext";
import { toast } from "react-toastify";

interface Chat {
  id: string;
  name: string;
}

function ChatPanel() {
  const [chats, setChats] = useState<Chat[]>([{ id: "1", name: "Chat 1" }]);
  const [activeChatId, setActiveChatId] = useState("1");

  const { setLayoutTree, setIsLayoutLoading, layoutTree, selectedElement } =
    useContext(CanvasContext);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setData,
    status,
    data,
    error,
  } = useChat({
    id: activeChatId,
    api: "/api/chats",
  });

  const isLoading = status === "submitted";

  const addNewChat = () => {
    const newChatId = (chats.length + 1).toString();
    const newChat: Chat = {
      id: newChatId,
      name: `Chat ${newChatId}`,
    };
    setChats((prev) => [...prev, newChat]);
    setActiveChatId(newChatId);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setData(undefined);
      handleSubmit(e, {
        body: {
          layoutTree: layoutTree,
          selectedElementId: selectedElement?.id,
        },
      });
    }
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const filteredData = data.filter((item: any) => item?.type !== "updates");
      const updates = data.filter((item: any) => item?.type === "updates");

      if ((updates[updates.length - 1] as any)?.hasLayoutUpdate) {
        setIsLayoutLoading(true);
      }
      if (filteredData && filteredData.length > 0) {
        setIsLayoutLoading(false);

        setLayoutTree((draft) => {
          const latestData = filteredData[filteredData.length - 1] as any;
          const layoutTree =
            latestData.layoutTree || latestData.layoutTreeOutput;
          draft.root = {
            ...(draft.root || ({} as any)),
            props: {
              children: layoutTree.root.props.children,
            },
          };
        });
      }
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setIsLayoutLoading(false);
      toast.error("Something went wrong");
    }
  }, [error]);

  return (
    <Flex direction="column" height="100%">
      <Flex justify="between" align="center" mb="3">
        <Text size="3" weight="medium">
          AI Assistant
        </Text>
        <Button
          size="2"
          variant="soft"
          onClick={addNewChat}
          style={{
            background:
              "linear-gradient(135deg, var(--blue-4) 0%, var(--blue-5) 100%)",
            color: "var(--blue-11)",
            border: "1px solid var(--blue-6)",
            borderRadius: "var(--radius-4)",
            cursor: "pointer",
          }}
        >
          <Flex align="center" gap="2">
            <PlusIcon />
            <Text>New Chat</Text>
          </Flex>
        </Button>
      </Flex>

      <ChatList
        chats={chats}
        activeChatId={activeChatId}
        onChatSelect={setActiveChatId}
      />

      <ChatMessages messages={messages} isLoading={isLoading} />
      <ChatInput
        input={input}
        onInputChange={handleInputChange}
        onSubmit={handleChatSubmit}
        isLoading={isLoading}
      />
    </Flex>
  );
}

export default ChatPanel;
