#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Create the MCP server
const server = new McpServer({
  name: "rhoai-assistant-mcp",
  version: "1.0.0",
});

// Add the echo tool
server.tool("echo", {
  description: "Echo back the input string",
  inputSchema: {
    type: "object",
    properties: {
      message: {
        type: "string",
        description: "The message to echo back",
      },
    },
    required: ["message"],
  },
}, async ({ message }) => {
  return {
    content: [
      {
        type: "text",
        text: `Echo: ${message}`,
      },
    ],
  };
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("RHOAI Assistant MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});