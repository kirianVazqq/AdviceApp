// test/events.test.js

const chai = require("chai");
const chaiHttp = require("chai-http");
const { sequelize } = require("../models");
const app = require("../index");

chai.use(chaiHttp);
const expect = chai.expect;

// Descripción de la prueba para la API de eventos
describe("Events API", () => {
  it("should insert a new event", (done) => {
    // Antes de ejecutar la prueba, sincronizar la base de datos
    before(async () => {
      await sequelize.sync();
    });

    // Datos de ejemplo para el evento
    let note = {
      userId: 1,
      info: "A description of the event.",
    };

    // Realizar una solicitud POST a la ruta /api/note con los datos del evento
    chai
      .request(app)
      .post("/api/note")
      .send(note)
      .end((err, res) => {
        // Verificar que la respuesta tenga un estado 200 (éxito)
        expect(res).to.have.status(200);
        // Verificar que la respuesta contenga la propiedad userId con el valor 1
        expect(res.body).to.have.property("userId", 1);
        // Verificar que la respuesta contenga la propiedad info con el valor "A description of the event."
        expect(res.body).to.have.property(
          "info",
          "A description of the event."
        );
        done(); // Indicar que la prueba ha finalizado
      });
  });
});

