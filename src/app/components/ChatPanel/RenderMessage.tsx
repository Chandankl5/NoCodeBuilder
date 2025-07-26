import { UIMessage } from "ai";
import { Text } from "@radix-ui/themes";

interface RenderMessageProps {
  message: UIMessage;
}

function RenderMessage({ message }: RenderMessageProps) {
  const { content } = message;
  return (
    <>
      <Text size="2" color="gray">
        {content}
      </Text>
    </>
  );
}

export default RenderMessage;
