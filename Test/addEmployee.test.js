const request = require("supertest");
let server = require("../server");

describe("/addEmployee", () => {
  let token;
  let bodyObj;

  beforeEach(() => {
    token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjRmMzI1ZTZkYjkxZmM5ZjVmYTUwMzciLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NDk0MzI2NTF9.DYQMGkZn1J-VKbRtnR8FwfbHm81K6I1HYucTGVsi93w";
    bodyObj = { email: "3@1.com", password: "123456789", name: "Omar" };
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
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjUwMmVhZTU5ZjkwODA3MmVkOTc4YWMiLCJyb2xlIjoiRW1wbG95ZWUiLCJpYXQiOjE2NDk0MzE1NDJ9.6V7L5IDxruNyczf3r_zcTDRl1OjouW80sbqvb3BYREQ";
    const res = await exec();
    expect(res.status).toBe(403);
  });

  it("should return 400 if name, email or password not provided", async () => {
    delete bodyObj.name;
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 400 if email already exists", async () => {
    bodyObj.email = "1@1.com";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 201 if completed", async () => {
    const res = await exec();
    expect(res.status).toBe(201);
  });
});
