"use client";

import Head from "next/head";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import ComponentsPanel from "./components/ComponentsPanel/ComponentsPanel";
import CanvasContainer from "./components/CanvasContainer/CanvasContainer";
import Nav from "./components/Nav/Nav";
import { Box, Flex } from "@radix-ui/themes";
import { CanvasProvider } from "./context/CanvasContext";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <Box position="absolute" width="100%" height="100%">
        <Flex direction="column" height="100%" overflow="hidden">
          <Nav />

          <CanvasProvider>
            <Flex direction="row" overflow="hidden" height="100%">
              <Box width="20%" height="100%" overflow="auto">
                <ComponentsPanel />
              </Box>

              <Flex
                direction="column"
                flexGrow="1"
                style={{
                  background: "var(--gray-3)",
                  borderLeft: "1px solid var(--gray-6)",
                  borderRight: "1px solid var(--gray-6)",
                }}
              >
                <CanvasContainer />
              </Flex>

              <Box width="20%" height="100%" overflow="auto">
                <ControlPanel />
              </Box>
            </Flex>
          </CanvasProvider>
        </Flex>
      </Box>
    </>
  );
}
