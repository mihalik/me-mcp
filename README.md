# ME-MCP

> Have your agent contact my agent.
>
> -- Cool people in movies

A personal MCP Server to let agents discover information about you and contact you.

## Overview

A Streamable HTTP MCP Server that deploys via Cloudflare Workers.  It easily runs in a cheap Cloudflare plan.

Me-MCP provides two tools:
* Fetch resume for the server owner
* Contact the server owner

The contact capability is powered via Discord webhooks since this is a bit easier to setup than setting up an email service like Mailgun, SendGrid, or SES.

## Getting started

### Configuration

* Update `wrangler.jsonc` vars `MCP_OWNER_NAME` with your name.
* Copy `.dev.vars.example` to `.dev.vars`.  Update `DISCORD_WEBHOOK_URL` with your Discord webhook URL.
* Update `public/resources/resume.txt` with a markdown formatted copy of your resume

### Running locally

```txt
npm install
npm run dev
```

### Deploy to Cloudflare

Set the Discord webhook URL.

```txt
npx wrangler secret put DISCORD_WEBHOOK_URL
```

Deploy

```txt
npm run deploy
```

### Discovery

Hopefully the [`.well-known/mcp`](https://github.com/orgs/modelcontextprotocol/discussions/84) discussion leads to a solution.  For now, share your URL directly.  And possibly provide some instructions (see next section) since it is not easy to use remote MCP servers yet.

## Using your Me-MCP (Or instructing someone else in the usage)

This MCP server uses the latest version of the MCP spec and uses the [Streamable HTTP transport](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http).  Not all MCP Clients have been updated to work with this new spec.  As of May 2025, the easiest way to use this server is probably [Claude Remote MCP](https://support.anthropic.com/en/articles/11175166-about-custom-integrations-using-remote-mcp) using a paid Claude plan.

You can also use [mcp-remoate](https://github.com/geelen/mcp-remote) client to proxy a local server to your remote server.  This will work in most popular MCP clients (Claude Desktop, Cursor, etc).  Use this config format:

```
{
  "mcpServers": {
    "remote-example": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://me-mcp.example.com/mcp"
      ]
    }
  }
}
```

Once added, the user/agent can ask questions about you and send messages to your Discord server.