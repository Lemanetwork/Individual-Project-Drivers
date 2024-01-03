const server = require("../server");
const session = require("supertest");
const agent = session(server);

const newDriver = {
  forename: "Luis",
  surname: "Manjarrez",
  teams: ["Castrol", "Alpine", "Cooper", "Lotus"],
  description: "Beginner driver",
  image:
    "https://img.freepik.com/premium-photo/man-racing-suit-stands-front-blurry-background_901003-10316.jpg",
  nationality: "Colombian",
  dob: "1990-01-01",
};

describe("Post drivers", () => {
  xit("Create a new driver in the DB should reply with status code 200", async () => {
    const { statusCode } = await agent.post("/posts").send(newDriver);
    expect(statusCode).toBe(200);
    expect(statusCode).not.toBe(400);
  });

  xit("Send an error message when there is missing information", async () => {
    const response = await agent.post("/posts").send({ name: "name" });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toMatch(
      "We are missing some important information about the Driver"
    );
  });
});
