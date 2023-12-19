const chai = require("chai");
const chaiHttp = require("chai-http");
const { sequelize, user } = require("../models"); // Asegúrate de importar el modelo de usuario
const app = require("../index");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Events API", () => {
  let createdUserId;


  before(async () => {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await sequelize.sync({ force: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  });

  beforeEach(async () => {
    const newUser = await user.create({
      email: "test@example.com",
      username: "testuser",
      password: "password",
      rol: "user"
    });
    createdUserId = newUser.id;
  });

  it("should insert a new event", (done) => {
    let note = {
      userId: createdUserId,
      info: "A description of the event.",
    };

    chai.request(app)
      .post("/api/note")
      .send(note)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("userId", createdUserId);
        expect(res.body).to.have.property("info", "A description of the event.");
        done();
      });
  });

});
