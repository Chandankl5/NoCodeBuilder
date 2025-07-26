import { createTool } from "@mastra/core/tools";
import { components } from "../../app/resources/Components";

export const componentsListTool = createTool({
  id: "GetComponentList",
  description: "Get the list of available components to be used in the website",
  execute: async () => {
    return {
      components,
    }
  }
})