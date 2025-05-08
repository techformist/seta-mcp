//  future: not used right now.
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerGreetingResource } from "./greeting.js";

export function registerAllResources(server: McpServer) {
  registerGreetingResource(server);
}
