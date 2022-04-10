const request = require("supertest");
let server = require("../server");

describe("/login", () => {
  let bodyObj;

  beforeEach(() => {
    bodyObj = { email: "1@1.com", password: "123456789" };
  });
  const exec = async () => {
    return await request(server).post("/user/login").send(bodyObj);
  };

  it("should return 400 if password or email not provided", async () => {
    delete bodyObj.email;
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 400 if password or email not valid", async () => {
    bodyObj.password = "123456788";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 400 if user not found", async () => {
    bodyObj.email = "10@1.com";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 200 if completed", async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });
});
