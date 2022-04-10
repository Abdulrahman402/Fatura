const request = require("supertest");
let server = require("../server");

describe("/generateAccessToken", () => {
  let token;
  let cookie;

  beforeEach(() => {
    token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjUwMmVhZTU5ZjkwODA3MmVkOTc4YWMiLCJyb2xlIjoiRW1wbG95ZWUiLCJpYXQiOjE2NDk1MDg4OTcsImV4cCI6MTY4MTA2NjQ5N30.zXBLOeWirui3qWCJFvTZ502gdC6EXaiOAGs1ECu7NeA";

    cookie =
      "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjRmMzI1ZTZkYjkxZmM5ZjVmYTUwMzciLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NDk0NjgyNDMsImV4cCI6MTY4MTAyNTg0M30.DY7uxTVcZ2s8DZAJaseQlKd3h0q2AuiB7swxlfS8Y1Y";
  });
  const exec = async () => {
    return await request(server)
      .post("/user/generateAccessToken")
      .set("authorization", token)
      .set("Cookie", cookie);
  };

  it("should return 401 if token not provided", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 401 if token not valid", async () => {
    token = token + "a";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 401 if both stored and sent tokens not for the same user", async () => {
    cookie =
      "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjRmMzI1ZTZkYjkxZmM5ZjVmYTUwMzciLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NDk1MDgxNjYsImV4cCI6MTY4MTA2NTc2Nn0.vSI0AEWXMNjwQObEKG4Q9Vu3GRoSn3GacmF5LOvVsYs";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 404 if user not found", async () => {
    token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjUxODUzODAyOGZlMjMzNTUzZDk5OWMiLCJpYXQiOjE2NDk1MDk3MTIsImV4cCI6MTY4MTA2NzMxMn0.F3TWvhvztm1lDyypGwU_P8EAV2Ezam_HBTmNMCQm8XM";
    cookie =
      "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjUxODUzODAyOGZlMjMzNTUzZDk5OWMiLCJpYXQiOjE2NDk1MDk3MTIsImV4cCI6MTY4MTA2NzMxMn0.F3TWvhvztm1lDyypGwU_P8EAV2Ezam_HBTmNMCQm8XM";
    const res = await exec();
    expect(res.status).toBe(404);
  });

  it("should return 200 if token generated", async () => {
    token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjRmMzI1ZTZkYjkxZmM5ZjVmYTUwMzciLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NDk0NjgyNDMsImV4cCI6MTY4MTAyNTg0M30.DY7uxTVcZ2s8DZAJaseQlKd3h0q2AuiB7swxlfS8Y1Y";
    const res = await exec();
    expect(res.status).toBe(200);
  });
});
