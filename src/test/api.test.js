const request = require("supertest");
const app = ("../app");

// jest.setTimeout(30500);
// jest.useRealTimers();


describe("API test", () => {
  
  test("GET /users/all", (done) => {
    request(app)
      .get("/users/all")
      .expect(200)
      .expect((res) => {
        expect(res.body.length).not.toBe(0);
      })
      .end((err, res) => {
        if(err) return done(err);
        return done();
      });
  })
});