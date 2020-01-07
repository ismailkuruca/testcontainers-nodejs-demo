const { GenericContainer } = require("testcontainers");
const request = require("supertest");

jest.setTimeout(20000);

let app;
let pgContainer;
let knexTestSetup;
beforeAll(async () => {
  pgContainer = await new GenericContainer("postgres")
    .withEnv("POSTGRES_USER", "test")
    .withEnv("POSTGRES_PASSWORD", "test")
    .withEnv("POSTGRES_DB", "postgres")
    .withExposedPorts(5432)
    .start();
  process.env.PG_PORT = pgContainer.getMappedPort(5432);
  app = require("../app");
  const knexTestConfig = require("../knexfile.js")["test"];
  knexTestSetup = require("knex")(knexTestConfig);
  await knexTestSetup.migrate.latest();
});

afterAll(async () => {
  await pgContainer.stop();
});

describe("Get Todos", () => {
  beforeEach(async () => {
    await knexTestSetup.raw("insert into todo_list values(123, '345');");
    await knexTestSetup.raw("insert into todo_list values(234, '456');");
  });
  afterEach(async () => {
    await knexTestSetup.raw("delete from todo_list");
  });
  it("should return all todos", async done => {
    const res = await request(app).get("/api/todos");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(2);
    done();
  });
  it("should return specific todo with id", async done => {
    const res = await request(app).get("/api/todos/234");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ id: 234, creator: "456", todo_items: [] });
    done();
  });
});
