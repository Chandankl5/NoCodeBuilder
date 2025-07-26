import React from "react";
import { Box, Flex, TextField, Button } from "@radix-ui/themes";
import { ArrowRightIcon } from "@radix-ui/react-icons";

interface ChatInputProps {
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

function ChatInput({
  input,
  onInputChange,
  onSubmit,
  isLoading,
}: ChatInputProps) {
  return (
    <Box>
      <form onSubmit={onSubmit}>
        <Flex gap="2" align="center">
          <TextField.Root
            value={input}
            onChange={onInputChange}
            placeholder="Type your message..."
            style={{
              flex: 1,
              background: "var(--gray-3)",
              border: "1px solid var(--gray-6)",
              borderRadius: "var(--radius-3)",
              height: "40px",
            }}
            disabled={isLoading}
          />
          <Flex
            asChild
            align="center"
            justify="center"
            style={{
              color: "white",
              border: "none",
              borderRadius: "var(--radius-3)",
              cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
              width: "40px",
              height: "40px",
            }}
          >
            <Button type="submit" disabled={!input.trim() || isLoading}>
              <ArrowRightIcon style={{ fontSize: "16px" }} />
            </Button>
          </Flex>
        </Flex>
      </form>
    </Box>
  );
}

export default React.memo(ChatInput);
