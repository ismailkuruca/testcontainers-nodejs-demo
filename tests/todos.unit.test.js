const request = require("supertest");
let app;
beforeAll(() => {
  jest.mock("../middlewares/getAllTodos", () =>
    jest.fn((req, _res, next) => {
      req.getAllTodosResponse = [
        { id: 999, creator: "me" },
        { id: 998, creator: "they" }
      ];
      next();
    })
  );
  jest.mock("../middlewares/getTodoById", () =>
    jest.fn((req, _res, next) => {
      req.getTodoByIdResponse = { id: 998, creator: "456", todo_items: [] };
      next();
    })
  );
  app = require("../app");
});

afterAll(done => {
  jest.unmock("../middlewares/getTodoById");
  jest.unmock("../middlewares/getAllTodos");
  app.close();
  done();
});

describe("Get Todos", () => {
  it("should return all todos", async done => {
    const res = await request(app).get("/api/todos");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(2);
    done();
  });
  it("should return specific todo with id", async done => {
    const res = await request(app).get("/api/todos/234");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ id: 998, creator: "456", todo_items: [] });
    done();
  });
});
