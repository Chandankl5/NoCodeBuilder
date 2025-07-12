import React from "react";
import { Box, Flex, Text } from "@radix-ui/themes";
import { MyLocation } from "@mui/icons-material";

interface SelectedElementBreadcrumbProps {
  element: {
    type: string;
    id?: string;
    parents?: string[];
  };
}

function SelectedElementBreadcrumb({
  element,
}: SelectedElementBreadcrumbProps) {
  return (
    <Box
      p="3"
      mb="3"
      style={{
        background: "var(--gray-1)",
        border: "1px solid var(--gray-6)",
        borderRadius: "var(--radius-3)",
        borderLeft: "3px solid var(--blue-9)",
      }}
    >
      <Flex align="center" gap="1" mb="2">
        <MyLocation
          style={{
            width: "14px",
            height: "14px",
            color: "var(--blue-9)",
          }}
        />
        <Box
          p="1"
          style={{
            background: "var(--blue-3)",
            border: "1px solid var(--blue-6)",
            borderRadius: "var(--radius-2)",
          }}
        >
          <Text
            size="1"
            weight="bold"
            style={{
              color: "var(--blue-11)",
              textTransform: "capitalize",
              fontSize: "11px",
              padding: "2px 4px",
            }}
          >
            {element.type}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default SelectedElementBreadcrumb;
