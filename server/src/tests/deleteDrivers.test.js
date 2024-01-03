const server = require("../server");
const session = require("supertest");
const agent = session(server);

describe("Delete drivers", () => {
  xit("Delete drivers from the DB using id", async () => {
    const response = await agent.delete(
      "/drivers/96c8c657-a4a7-440c-b814-61a7571998a6"
    );
    expect(response.body.message).toMatch("Driver was deleted successfully");
    expect(response.statusCode).toBe(200);
  });
});
