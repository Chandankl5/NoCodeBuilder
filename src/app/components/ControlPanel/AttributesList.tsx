import React from "react";
import { Box, Flex, Text, TextField } from "@radix-ui/themes";
import AddAttributeButton from "./AddAttributeButton";
import { CanvasElement } from "../../types/common";

interface AttributesListProps {
  attributes: Record<string, any>;
  onAttributeChange?: (key: string, value: string) => void;
  onAttributeAdd?: (key: string, value: string) => void;
  children?: CanvasElement;
}

function AttributesList({
  attributes,
  onAttributeChange,
  onAttributeAdd,
  children,
}: AttributesListProps) {
  const attributeEntries = Object.entries({
    ...attributes,
    ...(typeof children === "string" && { children }),
  });

  if (attributeEntries.length === 0) {
    return (
      <Box mt="3">
        <Flex direction="column" gap="3">
          <Box
            p="4"
            m="1"
            style={{
              background: "var(--gray-2)",
              border: "1px solid var(--gray-6)",
              borderRadius: "var(--radius-3)",
              textAlign: "center",
            }}
          >
            <Text
              size="2"
              style={{
                color: "var(--gray-9)",
                fontStyle: "italic",
              }}
            >
              No attributes available
            </Text>
          </Box>

          {/* Add Attribute Button for empty state */}
          <AddAttributeButton onAttributeAdd={onAttributeAdd} />
        </Flex>
      </Box>
    );
  }

  return (
    <Box mt="3">
      <Flex direction="column" gap="3">
        {attributeEntries.map(([key, value]) => (
          <Box
            key={key}
            p="3"
            style={{
              border: "1px solid var(--gray-6)",
              borderRadius: "var(--radius-3)",
            }}
          >
            <Flex direction="column" gap="2">
              <Box
                p="2"
                style={{
                  background: "var(--gray-3)",
                  borderRadius: "var(--radius-2)",
                  border: "1px solid var(--gray-5)",
                }}
              >
                <Text
                  size="1"
                  weight="bold"
                  style={{
                    letterSpacing: "0.3px",
                  }}
                >
                  {key}
                </Text>
              </Box>

              <Flex gap="2" align="center">
                <TextField.Root
                  value={value}
                  onChange={(e) => onAttributeChange?.(key, e.target.value)}
                  size="2"
                  style={{
                    flex: 1,
                    fontSize: "12px",
                  }}
                />
              </Flex>
            </Flex>
          </Box>
        ))}
        <AddAttributeButton onAttributeAdd={onAttributeAdd} />
      </Flex>
    </Box>
  );
}

export default AttributesList;
