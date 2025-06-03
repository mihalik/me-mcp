import { beforeAll, describe, it, expect } from "vitest";

let contactOwner: any;

beforeAll(async () => {
  process.env.DISCORD_WEBHOOK_URL = "https://example.com";
  process.env.MCP_OWNER_NAME = "Test";

  const mod = await import("../tools");
  const fakeServer = {
    tool(name: string, desc: string, schema: any, handler: any) {
      if (name === "contact-owner") {
        contactOwner = handler;
      }
    },
  } as any;

  mod.default(fakeServer);
});

describe("contact-owner tool", () => {
  it("returns an error when message exceeds 2000 characters", async () => {
    const longMessage = "a".repeat(2001);
    const result = await contactOwner({
      name: "Tester",
      email: "tester@example.com",
      message: longMessage,
    });

    expect(result.content[0].text).toBe(
      "Your message is too long. Please limit it to 2000 characters."
    );
  });
});
