const request = require("supertest");
let server = require("../server");

const User = require("../Models/User");

describe("/login", () => {
  let bodyObj;

  async function starter() {
    const user = new User({
      email: "2@1.com",
      password: "$2a$10$IVTdMNX2hsXbu5NPHhP6XuKSLyIwFuHstd31SoCv8UF50j/G9T6lK",
      name: "Ali",
    });
    await user.save();
  }

  starter();

  beforeEach(() => {
    bodyObj = { email: "2@1.com", password: "123456789" };
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

  // async function ender() {
  //   await User.deleteMany();
  // }

  // ender();
});
