import { html } from 'hono/html'

/**
 * This is a really simple HTML page using pico.css to provide some basic styling and uses
 * document.write to dynamically insert the MCP URL.  This is just fine for a simple page
 * like this.
 */
export default function renderReadme(c, name: string) {
    return c.html(
        html`
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light dark">
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.classless.min.css"
    > 
    <title>${name}'s MCP Server</title>
  </head>
  <body>
    <header>
        <h1>${name}'s MCP Server</h1>
    </header>
    <main>
        <p>
            A personal MCP server enabling agents to discover information about ${name} and interact with them.  MCP is available at the following path:
            <pre>

                <script>
                    document.write(window.location.origin + "/mcp");
                </script>
            </pre>
            This server provides two tools:
            <ul>
                <li><strong>Get Resume</strong>: Fetch a resume or work history.</li>
                <li><strong>Contact Owner</strong>: Send a message (requires your name and email address).</li>
            </ul>
        </p>

        <p>
            This requires an MCP client that supports remote MCP (Streamable HTTP).  For clients that do not support remote MCP, you can use <a href="https://github.com/geelen/mcp-remote">mcp-remote</a>.  Here's an example config:
            <pre>

                {
                    "mcpServers": {
                        "${name} MCP": {
                            "command": "npx",
                            "args": ["mcp-remote", "<script>document.write(window.location.origin + "/mcp");</script>"]
                        }
                    }
                }
            </pre>
        </p>
    </main>
    <footer>
        <p>
            This server is powered by <a href="https://github.com/mihalik/me-mcp">ME-MCP</a>.
        </p>
    </footer>
  </body>
</html>
`
    )
}