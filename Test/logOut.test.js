const request = require("supertest");
let server = require("../server");

describe("/logOut", () => {
  it("should return 401 if token not provided", async () => {
    const res = await request(server).get("/user/logOut").send({});
    expect(res.status).toBe(401);
  });

  it("should return 200 if logged out", async () => {
    const res = await request(server)
      .get("/user/logOut")
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjUwMmVhZTU5ZjkwODA3MmVkOTc4YWMiLCJyb2xlIjoiRW1wbG95ZWUiLCJpYXQiOjE2NDk0MzE1NDJ9.6V7L5IDxruNyczf3r_zcTDRl1OjouW80sbqvb3BYREQ"
      );
    expect(res.status).toBe(200);
  });
});
