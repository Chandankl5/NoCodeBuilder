import React from "react";
import { Box, Flex, Text } from "@radix-ui/themes";

function Nav() {
  return (
    <Box
      py="3"
      px="4"
      style={{
        background: "var(--gray-2)",
        borderBottom: "1px solid var(--gray-6)",
      }}
    >
      <Flex align="center" justify="between">
        <Text
          size="5"
          weight="bold"
          style={{
            background:
              "linear-gradient(135deg, var(--blue-11) 0%, var(--purple-11) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          NoCodeBuilder
        </Text>
      </Flex>
    </Box>
  );
}

export default Nav;
