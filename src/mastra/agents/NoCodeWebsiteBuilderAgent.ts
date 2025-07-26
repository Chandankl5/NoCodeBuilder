import { google } from "@ai-sdk/google";
import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";
import { componentsListTool } from "../tools/ComponentsTool";
import { layoutTypeDefsTool } from "../tools/LayoutTool";

import { UpstashStore } from "@mastra/upstash";
import { websiteBuilderPrompt } from "../prompts/WesbiteBuilderPrompt";

const upstashStore = new UpstashStore({
  url: process.env.UPSTASH_URL || "",
  token: process.env.UPSTASH_TOKEN || "",
});

const libSqlStore = new LibSQLStore({
  url: "file:../mastra.db",
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
    storage: process.env.NODE_ENV === "production" ? upstashStore : libSqlStore,
  }),
});

NoCodeWebsiteBuilderAgent.genTitle;
