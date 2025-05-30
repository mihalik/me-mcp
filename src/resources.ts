import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ReadResourceResult } from "@modelcontextprotocol/sdk/types.js";

import resume from "../public/resources/resume.txt";

/**
 * This registers a text-based resource for a resume.  There is also a tool
 * that can be used to fetch the same resume.  I don't think that most MCP 
 * clients will automatically fetch resources so the tool version is more
 * useful.
 */
export default function registerResources(server: McpServer) {
    server.resource(
        "resume",
        "resume://uri",
        { mimeType: "text/plain" },
        async (): Promise<ReadResourceResult> => {
            return {
                contents: [
                    {
                        uri: "resume://uri",
                        text: resume,
                    },
                ],
            };
        }
    );
}