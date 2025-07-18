import React, { useContext } from "react";
import { Box, Tabs, Text } from "@radix-ui/themes";
import { styleProperties } from "../../resources/StyleProperties";
import { CanvasContext } from "../../context/CanvasContext";
import SelectedElementBreadcrumb from "./SelectedElement";
import { PropertyGroup } from "./StyleControls";
import AttributesList from "./AttributesList";
import {
  getElementById,
  setDefaultProps,
  updateElementProps,
} from "../../functions/LayoutTree";
import { CanvasElement, StyleGroupType } from "../../types/common";

function ControlPanel() {
  const { selectedElement, setLayoutTree, setSelectedElement } =
    useContext(CanvasContext);

  const handlePropsChange = (prop: string) => {
    return function (key: string, value: string) {
      if (!selectedElement) return;

      setSelectedElement((draft) => {
        setDefaultProps(draft as CanvasElement);

        if (draft?.props?.[prop]) {
          draft.props[prop][key] = value;
        }
      });

      setLayoutTree((draft) => {
        const element = getElementById(selectedElement.id, draft.root);
        setDefaultProps(element as CanvasElement);

        updateElementProps(element as CanvasElement, draft.root, {
          [prop]: {
            ...element?.props?.[prop],
            [key]: value,
          },
        });
      });
    };
  };

  const handleStyleChange = (
    key: string,
    value: string,
    groupType?: StyleGroupType
  ) => {
    if (!selectedElement) return;

    setSelectedElement((draft) => {
      const style = draft?.props?.style?.find(
        (style) => style.type === groupType
      );
      if (style) {
        if (value) (style as any).properties[key] = value;
        else delete (style as any).properties[key];
      } else {
        setDefaultProps(draft as CanvasElement);
        draft?.props?.style?.push({
          type: groupType as StyleGroupType,
          properties: {
            [key]: value,
          },
        });
      }
    });

    setLayoutTree((draft) => {
      const element = getElementById(selectedElement.id, draft.root);
      const style = element?.props?.style?.find(
        (style) => style.type === groupType
      );
      if (style) {
        if (value) (style as any).properties[key] = value;
        else delete (style as any).properties[key];
      } else {
        setDefaultProps(element as CanvasElement);
        element?.props?.style?.push({
          type: groupType as StyleGroupType,
          properties: {
            [key]: value,
          },
        });
      }
    });
  };

  const handleChildrenChange = (key: string, value: string) => {
    if (!selectedElement) return;

    setSelectedElement((draft) => {
      if (draft?.props?.children) {
        draft.props.children = value;
      }
    });

    setLayoutTree((draft) => {
      const element = getElementById(selectedElement.id, draft.root);
      setDefaultProps(element as CanvasElement);

      updateElementProps(element as CanvasElement, draft.root, {
        children: value,
      });
    });
  };

  return (
    <Box
      p="3"
      style={{
        background: "var(--gray-1)",
        height: "100%",
        borderLeft: "1px solid var(--gray-6)",
        fontSize: "12px",
      }}
    >
      <Tabs.Root defaultValue="style">
        <Tabs.List mb="3">
          <Tabs.Trigger value="style">Style</Tabs.Trigger>
          <Tabs.Trigger value="properties">Properties</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="style">
          {selectedElement ? (
            <Box px="2">
              <SelectedElementBreadcrumb element={selectedElement} />
              {styleProperties.map((styleProperty, index) => (
                <PropertyGroup
                  key={styleProperty.type}
                  styleProperty={styleProperty}
                  isLast={index === styleProperties.length - 1}
                  onStyleChange={handleStyleChange}
                />
              ))}
            </Box>
          ) : (
            <NoElementSelected />
          )}
        </Tabs.Content>

        <Tabs.Content value="properties">
          {selectedElement ? (
            <Box px="2">
              <SelectedElementBreadcrumb element={selectedElement} />
              <Text size="2" style={{ color: "var(--gray-11)" }}>
                Properties
              </Text>
              <AttributesList
                attributes={selectedElement.props?.attributes || {}}
                onAttributeChange={handlePropsChange("attributes")}
                onAttributeAdd={handlePropsChange("attributes")}
                onChildrenChange={handleChildrenChange}
                children={selectedElement.props?.children as any}
              />
            </Box>
          ) : (
            <NoElementSelected />
          )}
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}

function NoElementSelected() {
  return (
    <Box p="3">
      <Text size="2" style={{ color: "var(--gray-11)" }}>
        No element selected
      </Text>
    </Box>
  );
}

export default ControlPanel;
