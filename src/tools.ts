import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import resume from "../public/resources/resume.txt";

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || "";
if (DISCORD_WEBHOOK_URL === "") {
    throw new Error("DISCORD_WEBHOOK_URL environment variable is not set.  See README.md for details.");
}
const MCP_OWNER_NAME = process.env.MCP_OWNER_NAME || "";

const toolResult = (str: string): CallToolResult => ({
    content: [
        {
            type: "text",
            text: str,
        },
    ],
});

export default function registerTools(server: McpServer) {
    server.tool("get-resume", `Fetches a resume for ${MCP_OWNER_NAME}`, {}, async (): Promise<CallToolResult> => {
        return toolResult(resume);
    });

    server.tool(
        "contact-owner",
        `Sends a message to ${MCP_OWNER_NAME}.  Use this to contact the owner of this MCP Server.`,
        {
            name: z.string().describe("Your name"),
            email: z.string().email().describe("Your email address"),
            message: z.string().describe(`Your message to ${MCP_OWNER_NAME}`),
        },
        async ({ name, email, message }) => {
            if (!name) {
                return toolResult("Please provide your name.");
            }
            if (!email) {
                return toolResult("Please provide your email address.");
            }
            if (!message) {
                return toolResult("Please provide a message.");
            }
            if (message.length > 2000) {
                return toolResult("Your message is too long. Please limit it to 2000 characters.");
            }
            console.log(`Received contact request from ${name} (${email}): ${message}`);
            const payload = {
                content: `**New Contact Request via ME-MCP**\n\n**Name:** ${name}\n**Email:** ${email}\n**Message:** ${message}`,
            };
            try {
                const response = await fetch(DISCORD_WEBHOOK_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });
                if (!response.ok) {
                    throw new Error(`Discord webhook failed with status ${response.status}`);
                }
            } catch (error) {
                console.error("Error sending contact request to Discord:", error);
                return toolResult("There was an error sending your message. Please try again later.");
            }

            return toolResult(`Thank you, ${name}! Your message has been sent!`);
        }
    );
}
