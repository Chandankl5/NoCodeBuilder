import React, { useContext } from "react";
import { Box, Text, Select, Flex, TextField } from "@radix-ui/themes";
import {
  StyleProperty,
  StyleProperties,
  StyleGroupType,
} from "../../types/common";
import { CanvasContext } from "../../context/CanvasContext";

interface PropertyGroupProps {
  styleProperty: StyleProperties;
  isLast: boolean;
  onStyleChange: (
    key: string,
    value: string,
    groupType?: StyleGroupType
  ) => void;
}

interface PropertyInputProps {
  property: StyleProperty;
  value: string;
  onStyleChange: (
    key: string,
    value: string,
    groupType?: StyleGroupType
  ) => void;
  groupType: StyleGroupType;
}

export function PropertyGroup({
  styleProperty,
  isLast,
  onStyleChange,
}: PropertyGroupProps) {
  const { selectedElement } = useContext(CanvasContext);
  const groupStyle = selectedElement?.props?.style?.find(
    (style) => style.type === styleProperty.type
  );

  return (
    <Box key={styleProperty.type}>
      <Box mb="4">
        <Box
          p="2"
          mb="3"
          style={{
            background: "var(--gray-3)",
            borderRadius: "4px",
            border: "1px solid var(--gray-5)",
          }}
        >
          <Text
            weight="bold"
            size="2"
            style={{
              textTransform: "capitalize",
              letterSpacing: "0.3px",
            }}
          >
            {styleProperty.type}
          </Text>
        </Box>
        {styleProperty.properties.map((property: any) => (
          <Box key={property.name} mb="2">
            <Flex direction="column" gap="1">
              <Text size="1" weight="medium">
                {property.label}
              </Text>
              <PropertyInput
                property={property}
                value={(groupStyle as any)?.properties?.[property.name] ?? ""}
                onStyleChange={onStyleChange}
                groupType={styleProperty.type}
              />
            </Flex>
          </Box>
        ))}
      </Box>
      {!isLast && (
        <Box
          mb="4"
          style={{
            height: "1px",
            background: "var(--gray-6)",
            width: "100%",
          }}
        />
      )}
    </Box>
  );
}

function PropertyInput({
  property,
  value,
  onStyleChange,
  groupType,
}: PropertyInputProps) {
  if (property.enums) {
    return (
      <Select.Root
        value={value}
        onValueChange={(value) =>
          onStyleChange(property.name, value, groupType)
        }
      >
        <Select.Trigger
          placeholder="Select value"
          style={{
            width: "100%",
            height: "28px",
            fontSize: "12px",
            minWidth: "0",
          }}
        />
        <Select.Content>
          {property.enums.map((option: string) => (
            <Select.Item key={option} value={option}>
              {option}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    );
  } else if (property.units) {
    const [_, number, unit] = value.match(/(\d*\.?\d*)(.*)/) ?? [];

    return (
      <Flex gap="1" style={{ width: "100%" }}>
        <TextField.Root
          placeholder="Value"
          size="1"
          type="number"
          step="any"
          style={{
            flex: 1,
            height: "28px",
          }}
          onChange={(e) => {
            onStyleChange(
              property.name,
              `${e.target.value ? `${e.target.value}${unit || property?.units?.[0]}` : ""}`,
              groupType
            );
          }}
          value={number}
        />
        <Select.Root
          value={unit}
          onValueChange={(value) => {
            onStyleChange(property.name, `${number}${value}`, groupType);
          }}
        >
          <Select.Trigger
            placeholder="px"
            style={{
              height: "28px",
              fontSize: "12px",
            }}
          />
          <Select.Content>
            {property.units.map((unit: string) => (
              <Select.Item key={unit} value={unit}>
                {unit}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Flex>
    );
  } else {
    return (
      <TextField.Root
        value={value}
        onChange={(e) => {
          onStyleChange(property.name, e.target.value, groupType);
        }}
        placeholder="Value"
        size="1"
        style={{
          width: "100%",
          height: "28px",
        }}
      />
    );
  }
}
