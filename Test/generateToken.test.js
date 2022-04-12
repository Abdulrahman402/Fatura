const request = require("supertest");
let server = require("../server");

const User = require("../Models/User");

const REFRESHTOKEN = require("../Services/JWT/generateRefresh");

describe("/generateAccessToken", () => {
  let token;
  let cookie;

  beforeEach(() => {
    token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU0ZDBlMWY1OGY4NjkxNzk3YmU4YTAiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NDk3MzAwMDUsImV4cCI6MTY4MTI4NzYwNX0.2UqOnQAgMHKTaPYS5UDa_e-v3WyI7vT8sCJxjZcRu9w";

    cookie =
      "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU0ZDBlMWY1OGY4NjkxNzk3YmU4YTAiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NDk3MzAwMDUsImV4cCI6MTY4MTI4NzYwNX0.2UqOnQAgMHKTaPYS5UDa_e-v3WyI7vT8sCJxjZcRu9w";
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
    const res = await exec();
    expect(res.status).toBe(404);
  });

  it("should return 200 if token generated", async () => {
    const user = new User({
      name: "Hani",
      email: "5@1.com",
      password: "123456789",
    });
    await user.save();

    const refreshToken = await REFRESHTOKEN(user);
    token = `Bearer ${refreshToken}`;
    cookie = `refreshToken=${refreshToken}`;
    const res = await exec();
    expect(res.status).toBe(200);
  });
});
