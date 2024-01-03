const server = require("../server");
const session = require("supertest");
const agent = session(server);

describe("Get drivers from the API and DB", () => {
  xit("Get all drivers should respond with an array of drivers", async () => {
    const { body } = await agent.get("/drivers");
    expect(body).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
  });

  xit("Get all drivers is confirm with status code 200", async () => {
    const { statusCode } = await agent.get("/drivers");
    expect(statusCode).toBe(200);
  });

  xit("Get drivers with a forename received by query", async () => {
    const { body } = await agent.get("/drivers/?forename=juan");
    expect(body[0].forename).toEqual("Juan");
    expect(body.length).not.toBe(0);
  });

  xit("Get a driver with an id received by params", async () => {
    const { body } = await agent.get("/drivers/30");
    expect(body.id).toBe(30);
    expect(body.forename).toEqual("Michael");
    expect(body.surname).toEqual("Schumacher");
  });
});
