const request = require("supertest");
let server = require("../server");

const User = require("../Models/User");

describe("/addEmployee", () => {
  let token;
  let bodyObj;

  const starter = async () => {
    await User.deleteMany();
  };

  starter();

  beforeEach(() => {
    token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU0ZDBlMWY1OGY4NjkxNzk3YmU4YTAiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NDk3MjU2ODksImV4cCI6MTY4MTI4MzI4OX0.XxcGIf9EA8ZNS-f_cB7NlXaVrM-xfV5-GtAovXhv3gM";
    bodyObj = { email: "1@1.com", password: "123456789", name: "Omar" };
  });

  const exec = async () => {
    return await request(server)
      .post("/user/addEmployee")
      .set("authorization", token)
      .send(bodyObj);
  };
  it("should return 401 if token not provided", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 401 if token not valid", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 403 if user not admin", async () => {
    token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU0ZDBlZGY1OGY4NjkxNzk3YmU4YTMiLCJyb2xlIjoiRW1wbG95ZWUiLCJpYXQiOjE2NDk3MjU3NTAsImV4cCI6MTY4MTI4MzM1MH0.gEzlDNVQW3jDbAObmfpJlWTYdp7lKAt13lQjaKS-idg";
    const res = await exec();
    expect(res.status).toBe(403);
  });

  it("should return 400 if name, email or password not provided", async () => {
    delete bodyObj.name;
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 201 if completed", async () => {
    const res = await exec();
    expect(res.status).toBe(201);
  });

  it("should return 400 if email already exists", async () => {
    const res = await exec();
    expect(res.status).toBe(400);
  });

  // starter();

  // async function ender() {
  //   await User.deleteMany();
  // }

  // ender();
});
