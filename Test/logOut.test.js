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
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU0ZDBlMWY1OGY4NjkxNzk3YmU4YTAiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NDk3MjU2ODksImV4cCI6MTY4MTI4MzI4OX0.XxcGIf9EA8ZNS-f_cB7NlXaVrM-xfV5-GtAovXhv3gM"
      );
    expect(res.status).toBe(200);
  });
});
