const request = require("supertest");
const User = require("../Models/User");
let server = require("../server");

describe("/assignRole", () => {
  let token;
  let role;
  let param;
  beforeEach(() => {
    token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU0ZDBlMWY1OGY4NjkxNzk3YmU4YTAiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NDk3MjU2ODksImV4cCI6MTY4MTI4MzI4OX0.XxcGIf9EA8ZNS-f_cB7NlXaVrM-xfV5-GtAovXhv3gM";

    role = "Employee";
    param = ":userId";
  });

  const exec = async () => {
    return await request(server)
      .put(`/user/assignRole/${param}`)
      .set("authorization", token)
      .send({ role: role });
  };

  it("should return 401 if token not provided", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 403 if user not admin", async () => {
    token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjUwMmVhZTU5ZjkwODA3MmVkOTc4YWMiLCJyb2xlIjoiRW1wbG95ZWUiLCJpYXQiOjE2NDk0MzE1NDJ9.6V7L5IDxruNyczf3r_zcTDRl1OjouW80sbqvb3BYREQ";
    const res = await exec();
    expect(res.status).toBe(403);
  });

  it("should return 400 if role not provided in body", async () => {
    role = "";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 400 if role not Admin or Employee", async () => {
    role = "Manager";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 404 if user not found", async () => {
    param = "62502eae59f908072ed978aa";
    const res = await exec();
    expect(res.status).toBe(404);
  });

  it("should return 200 if user updated", async () => {
    const user = new User({
      name: "Ahmed",
      password: "123456789",
      email: "3@1.com",
    });
    await user.save();
    param = user._id;
    const res = await exec();
    expect(res.status).toBe(200);
  });

  // async function ender(User) {
  //   await User.findOneAndRemove({ email: "3@1.com" });
  // }
  // ender(User);
});
