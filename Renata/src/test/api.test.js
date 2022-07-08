const request = require("supertest");
const app = require("../app");

// jest.setTimeout(30500);
// jest.useRealTimers();

let elementId; 

describe("API test", () => {
  
  test("GET /users/all", (done) => {
    request(app)
      .get("/users/all")
      .expect(200)
      .expect((res) => {
        // console.log("BODY DA RESPOSTA", res.body);
        expect(res.body.length).not.toBe(0);
      })
      .end((err, res) => {
        if(err) return done(err);
        return done();
      });
  });

  test("POST /users/create", (done) => {
    request(app)
      .post("/users/create")
      .expect("Content-Type", /json/)
      .send({
        name: "Renata",
        email: "renata@email.com",
        password: "123456"
      })
      .expect(201)
      .end((err, res) => {
        console.log("BODY DA RESPOSTA", res.body)
        if(err) return done(err);
        console.log("ID DO USUÁRIO RECÉM CRIADO", res.body.savedUser._id);
        console.log("VARIAVEL DE ID VAZIA", elementId)
        elementId = res.body.savedUser._id;
        
        console.log("VARIAVEL DE ID PREENCHIDA", elementId)


        return done();
      });
  });

  
  test("PATCH /users/updated/:id", (done) => {
    request(app)
      .patch(`/users/update/${elementId}`)
      .expect("Content-Type", /json/)
      .send({
        name: "Renata Atualizada",
        email: "renataatualizada@email.com"
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.savedUser._id).toBe(elementId);
        expect(res.body.savedUser.email).toBe("renataatualizada@email.com");
        expect(res.body.savedUser.name).toBe("Renata Atualizada");
      })
      .end((err, res) => {
        if(err) return done(err);
        return done();
      });
  });
});