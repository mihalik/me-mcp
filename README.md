# ME-MCP

> "Have your agent contact my agent."
>
> -- Cool people in movies

A personal MCP (Model Context Protocol) server enabling agents to discover information about you and facilitate direct communication.

## Overview

ME-MCP is a lightweight Streamable HTTP MCP server designed for deployment via Cloudflare Workers.

### Features
* **Resume Fetching**: Easily share your resume via MCP.
* **Direct Contact**: Receive direct messages

Direct contact is accomplished through Discord webhooks, offering a simpler alternative to email services.

## Getting started

### Configuration

* Update `wrangler.jsonc` vars `MCP_OWNER_NAME` with your name.
* Copy `.dev.vars.example` to `.dev.vars`.  Update `DISCORD_WEBHOOK_URL` with your Discord webhook URL.
* Update `public/resources/resume.txt` with a markdown formatted copy of your resume

### Local Development

Install dependencies and run locally:

```txt
npm install
npm run dev
```

### Deployment

Set the Discord webhook URL.

```txt
npx wrangler secret put DISCORD_WEBHOOK_URL
```

Deploy

```txt
npm run deploy
```

### Discovery

Currently, `.well-known/mcp` discovery is under active discussion ([see here](https://github.com/orgs/modelcontextprotocol/discussions/84)). For now, share your URL directly and provide instructions for users to connect.

## Using Your Me-MCP

This MCP server adheres to the latest MCP spec using [Streamable HTTP transport](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http). As of May 2025, the recommended method to connect is via [Claude Remote MCP](https://support.anthropic.com/en/articles/11175166-about-custom-integrations-using-remote-mcp) with a paid Claude subscription.

Alternatively, use the [mcp-remote](https://github.com/geelen/mcp-remote) client for proxying, compatible with most MCP clients (Claude Desktop, Cursor, etc.). Configure it as follows:
    
    
    {
      "mcpServers": {
        "remote-example": {
          "command": "npx",
          "args": ["mcp-remote", "https://me-mcp.example.com/mcp"]
        }
      }
    }

After configuration, users or agents can query your information and send messages directly to your Discord.