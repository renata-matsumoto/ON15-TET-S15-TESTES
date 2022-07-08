const request = require("supertest");
const app = require("../app");

// para rodar o teste, deixe o servidor rodando e abra outro
// de um npm run test

let elementId;

describe("API test", () => {
  test("GET /livrarias/all", (done) => {
    request(app)
      .get("/livrarias/all")
      .expect(200)
      .expect((res) => {
        expect(res.body).not.toBe(0);
      })
      .end((error, res) => {
        if (error) return done(error);
        return done();
      });
  });

  test("POST /livrarias/create", (done) => {
    request(app)
      .post("/livrarias/create")
      .expect("Content-Type", /json/)
      .send({
        name: "Livraria Luisa",
        address: "Rua Geraldo Abdala",
        site: "Luisalivraria.com.br",
      })
      .expect(201)
      .end((error, res) => {
        if (error) return done(error);
        return done();
      });
  });

  test("PUT /livrarias/update/:id", (done) => {
    request(app)
      .put(`/livrarias/update/${elementId}`)
      .expect("Content-Type", /json/)
      .send({
        name: "Stop Livraria",
        site: "stoplivraria.com.br",
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.savedLibrary._id).toBe(elementId);
        expect(res.body.savedLibrary.name).toBe("Stop Livraria");
        expect(res.body.savedLibrary.site).toBe("stoplivraria.com.br");
      })
      .end((error, res) => {
        if (error) return done(error);
        return done();
      });
  });

  test("DELETE /livrarias/delete/:id", (done) => {
    request(app)
      .delete(`/livrarias/delete/${elementId}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        console.log(res.body);
        expect(res.body.libraryFind.site).toBe("stoplivraria.com.br");
      })
      .end((error, res) => {
        if (error) return done(error);
        return done();
      });
  });
});
