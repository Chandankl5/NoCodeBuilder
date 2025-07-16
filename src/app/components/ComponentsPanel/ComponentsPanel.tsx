import React, { useState, useMemo } from "react";
import { components } from "../../resources/Components";
import Draggable from "../Draggable/Draggable";
import { Box, Flex, Text } from "@radix-ui/themes";
import { iconMap } from "./PanelConfig";
import SearchBar from "./SearchBar";

function ComponentsPanel() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter components based on search query
  const filteredComponents = useMemo(() => {
    if (!searchQuery.trim()) {
      return components.filter((component) => component.showInPanel);
    }
    return components.filter((component) =>
      component.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <Box
      p="4"
      height="100%"
      style={{
        background: "var(--gray-2)",
        borderRight: "1px solid var(--gray-6)",
      }}
    >
      <Text size="3" weight="medium" mb="4">
        Components
      </Text>

      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <Flex direction="column" gap="3">
        {filteredComponents.length > 0 ? (
          filteredComponents.map((component) => {
            return (
              <Draggable
                id={component.id}
                key={component.id}
                dataTransfer={{
                  type: "application/json",
                  value: JSON.stringify({
                    type: component.type,
                    children: component.children,
                  }),
                }}
              >
                <Flex
                  direction="row"
                  align="center"
                  gap="3"
                  p="3"
                  style={{
                    background: "var(--gray-3)",
                    border: "1px solid var(--gray-6)",
                    borderRadius: "var(--radius-3)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: "var(--shadow-2)",
                  }}
                >
                  <Box
                    style={{
                      color: "var(--blue-10)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {component.icon ? iconMap[component.icon] : null}
                  </Box>
                  <Text
                    size="2"
                    weight="medium"
                    style={{ color: "var(--gray-12)" }}
                  >
                    {component.name}
                  </Text>
                </Flex>
              </Draggable>
            );
          })
        ) : (
          <Box
            p="4"
            style={{
              background: "var(--gray-3)",
              border: "1px solid var(--gray-6)",
              borderRadius: "var(--radius-3)",
              textAlign: "center",
            }}
          >
            <Text
              size="2"
              style={{ color: "var(--gray-9)", fontStyle: "italic" }}
            >
              No components found matching "{searchQuery}"
            </Text>
          </Box>
        )}
      </Flex>
    </Box>
  );
}

export default ComponentsPanel;
