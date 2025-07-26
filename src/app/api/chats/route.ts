import { NoCodeWebsiteBuilderAgent } from "@/mastra/agents/NoCodeWebsiteBuilderAgent";
import { createDataStreamResponse } from "ai";
import { RuntimeContext } from "@mastra/core/di";

async function parse(stream: any, dataStream: any) {
  const JSON_START_IDENTIFIER = "<JSON_START>";
  const JSON_END_IDENTIFIER = "<JSON_END>";

  let buffer = "";
  let jsonStartIdx = -1,
    jsonEndIdx = -1,
    pointer = 0;

  for await (let chunk of stream.textStream) {
    buffer += chunk;
    let content = "";

    if (jsonStartIdx === -1) {
      const index = chunk.indexOf(JSON_START_IDENTIFIER);
      if (index >= 0) {
        content = chunk.slice(0, index);
        jsonStartIdx = pointer + index;
        dataStream.writeData({ type: "updates", hasLayoutUpdate: true });
      }
    }

    pointer += chunk.length;

    if (jsonEndIdx === -1) {
      if (chunk.indexOf(JSON_END_IDENTIFIER) > 0) {
        jsonEndIdx = pointer;
      }
    }

    if (jsonStartIdx === -1) {
      dataStream.write("0:" + JSON.stringify(chunk) + "\n");
    }
    if (content) {
      dataStream.write("0:" + JSON.stringify(content) + "\n");
      content = "";
    }

    if (jsonStartIdx >= 0 && jsonEndIdx > 0) {
      const json = buffer.slice(
        jsonStartIdx + JSON_START_IDENTIFIER.length,
        jsonEndIdx - JSON_END_IDENTIFIER.length
      );

      try {
        const data = JSON.parse(json);
        dataStream.writeData(data);
        jsonStartIdx = jsonEndIdx = -1;
      } catch (err) {
        console.error("Error parsing JSON data", err);
        throw err;
      }
    }
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { messages, layoutTree, selectedElementId } = body;

  return createDataStreamResponse({
    async execute(dataStream) {
      const runtimeContext = new RuntimeContext();
      runtimeContext.set("layoutTree", layoutTree);
      runtimeContext.set("selectedElementId", selectedElementId);

      const stream = await NoCodeWebsiteBuilderAgent.stream(messages, {
        runtimeContext,
      });
      await parse(stream, dataStream);
    },
  });
}
