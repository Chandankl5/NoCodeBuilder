import React, { useState } from "react";
import { Flex, Text, TextField, Button, Popover } from "@radix-ui/themes";
import { Add, Check } from "@mui/icons-material";

interface AddAttributeButtonProps {
  onAttributeAdd?: (key: string, value: string) => void;
  buttonText?: string;
  popoverTitle?: string;
}

function AddAttributeButton({
  onAttributeAdd,
  buttonText = "Add Attribute",
  popoverTitle = "Add New Attribute",
}: AddAttributeButtonProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const handleAddAttribute = () => {
      onAttributeAdd?.(newKey.trim(), newValue);
      setNewKey("");
      setNewValue("");
      setIsPopoverOpen(false);
  };

  return (
    <Popover.Root open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <Popover.Trigger>
        <Button
          variant="outline"
          size="2"
          style={{
            width: "100%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "12px",
            border: "2px dashed var(--gray-6)",
            background: "transparent",
            color: "var(--gray-11)",
          }}
        >
          <Add style={{ width: "16px", height: "16px" }} />
          {buttonText}
        </Button>
      </Popover.Trigger>

      <Popover.Content
        style={{
          width: "280px",
          padding: "16px",
          background: "var(--gray-1)",
          border: "1px solid var(--gray-6)",
          borderRadius: "var(--radius-3)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Flex direction="column" gap="3">
          <Text size="2" weight="bold" style={{ color: "var(--gray-12)" }}>
            {popoverTitle}
          </Text>

          <Flex direction="column" gap="2">
            <Text size="1" style={{ color: "var(--gray-11)" }}>
              Attribute Key
            </Text>
            <TextField.Root
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              placeholder="Enter attribute name..."
              size="2"
              style={{ width: "100%" }}
            />
          </Flex>

          <Flex direction="column" gap="2">
            <Text size="1" style={{ color: "var(--gray-11)" }}>
              Attribute Value
            </Text>
            <TextField.Root
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="Enter attribute value..."
              size="2"
              style={{ width: "100%" }}
            />
          </Flex>

          <Flex gap="2" justify="end" mt="2">
            <Button
              variant="soft"
              size="2"
              color="gray"
              onClick={() => {
                setNewKey("");
                setNewValue("");
                setIsPopoverOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              size="2"
              color="blue"
              onClick={handleAddAttribute}
              disabled={!newKey.trim()}
              style={{
                cursor: newKey.trim() ? "pointer" : "not-allowed",
              }}
            >
              <Check
                style={{ width: "14px", height: "14px", marginRight: "4px" }}
              />
              Add
            </Button>
          </Flex>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}

export default AddAttributeButton;
