import React, { useState, useLayoutEffect, JSX } from "react";
import { highlight } from "./Highlighter";
import { Box, Flex, Text, Separator } from "@radix-ui/themes";
import { styleHTML } from "../constants/Code";
import { html as beautifyHtml, css as beautifyCss } from "js-beautify";

function DocumentCodeView() {
  const [html, setHtml] = useState<JSX.Element | null>(null);
  const [css, setCss] = useState<JSX.Element | null>(null);

  useLayoutEffect(() => {
    const code =
      (document.getElementById("canvas-frame") as HTMLIFrameElement)
        ?.contentDocument?.documentElement.outerHTML || "";

    void highlight(
      beautifyHtml(code, {
        indent_size: 2,
        wrap_line_length: 40,
        wrap_attributes: "force-expand-multiline",
      }),
      "html"
    ).then(setHtml);
    void highlight(
      beautifyCss(styleHTML, { indent_size: 2, wrap_line_length: 50 }),
      "css"
    ).then(setCss);
  }, []);

  return (
    <Box width="100%" minHeight="400px" height="100%">
      <Flex direction="column" height="100%" gap="4">
        <Box
          height="300px"
          overflow="auto"
          p="4"
          style={{
            background: "var(--gray-1)",
            border: "1px solid var(--gray-6)",
            borderRadius: "var(--radius-3)",
            boxShadow: "var(--shadow-2)",
          }}
        >
          <Flex align="center" gap="2" mb="3">
            <Text weight="medium" size="3" style={{ color: "var(--gray-12)" }}>
              HTML
            </Text>
          </Flex>
          <Box style={{ fontSize: "13px", lineHeight: "1.4" }}>
            {html ?? (
              <Text size="2" color="gray">
                Loading HTML...
              </Text>
            )}
          </Box>
        </Box>

        <Separator size="4" />

        <Box
          height="250px"
          overflow="auto"
          p="4"
          style={{
            background: "var(--gray-1)",
            border: "1px solid var(--gray-6)",
            borderRadius: "var(--radius-3)",
            boxShadow: "var(--shadow-2)",
          }}
        >
          <Flex align="center" gap="2" mb="3">
            <Text weight="medium" size="3" style={{ color: "var(--gray-12)" }}>
              CSS
            </Text>
          </Flex>
          <Box style={{ fontSize: "13px", lineHeight: "1.4" }}>
            {css ?? (
              <Text size="2" color="gray">
                Loading CSS...
              </Text>
            )}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default DocumentCodeView;
