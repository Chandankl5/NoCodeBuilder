import { google } from "@ai-sdk/google";
import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";
import { componentsListTool } from "../tools/ComponentsTool";
import { layoutTypeDefsTool } from "../tools/LayoutTool";
import { websiteBuilderPrompt } from "../prompts/WesbiteBuilderPrompt";

const libSqlStore = new LibSQLStore({
  url: process.env.LIBSQL_URL || "",
  authToken: process.env.LIBSQL_AUTH_TOKEN || "",
});

export const NoCodeWebsiteBuilderAgent = new Agent({
  name: "NoCodeWebsiteBuilderAgent",
  instructions: ({ runtimeContext }) => {
    const id = runtimeContext.get("selectedElementId") as string;
    const layoutTree = runtimeContext.get("layoutTree");

    return `
${websiteBuilderPrompt({ id, layoutTree })}
`;
  },
  model: google("gemini-2.5-pro"),
  tools: {
    componentsListTool,
    layoutTypeDefsTool,
  },
  memory: new Memory({
    storage: libSqlStore,
  }),
});

NoCodeWebsiteBuilderAgent.genTitle;
