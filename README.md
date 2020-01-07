# Simple Integration Testing of an Express/Knex/Objection app via `testcontainers`

A very simple todo list app using postgres as the default DB engine and provides functionalities with Knex/Objection while serving them under an Express App.
Main takeaway is building a very simple integration test harness to test/validate the provided functionality where unit testing falls short.

## package.json

- `pg` - PostreSQL module
- `knex` - Query builder
- `objection` - ORM built upon Knex
- `express` - API framework
- `jest` & `supertest` - Simple testing scaffolding for the API
- `testcontainers` - Provides code driven container orchestration

## Pros and Cons

Pros:

- Increased visibility on potential problems that can't be unit tested efficiently. e.g Connection configurations, Deadlocks, Migrations etc.
- Using the actual DB technology and versioning of staging/production environments which increases confidence on the code you write.
- Super easy to integrate into CI/CD systems since all orchestrations are done through the code.
- Easier for onboarding developers that has no prior docker knowledge on to the project, as opposed to maintaining `compose` files.

Cons:

- Almost an order of magnitude slower in terms of test suite initalisation since it requires a fully fledged container to be booted up and be ready.
- Somewhat increased complexity in the test code, although this is to be expected when we "go up" in the testing pyramid.

## How to use it

Booting up a postgres container with `testcontainers` is as easy as the following:

```javascript
const { GenericContainer } = require("testcontainers");  
const pgContainer = new GenericContainer("postgres").start();
```

---

You can pass additional parameters to set up postgres related environment variables (like username, password, db name etc) and expose ports from the container like this:
Please keep in mind that the newly created container like this; will start on a random port and we need to dynamically override our port definition in our `knexfile`.

```javascript
const pgContainer = new GenericContainer("postgres")  
    .withEnv("POSTGRES_USER", "test")  
    .withEnv("POSTGRES_PASSWORD", "test")  
    .withEnv("POSTGRES_DB", "postgres")  
    .withExposedPorts(5432)  
    .start();  
```

---

After we start our postgres instance, since it is a brand new empty database, we probably would like to run all of our migrations on it.

```javascript
require("knex")(yourKnexConfig).migrate.latest();
```

---

Once we are done with our test, we can and should destroy the container to save up resources.

```javascript
pgContainer.stop();
```

---

> It would be advisable to do the setup steps in `beforeAll` and teardown steps in `afterAll`, instead of on each test since these are costly.

---

Once we define our setup and teardown routines, we can now focus on the testing!

In the example below, I am writing the test without any mocks at all. 
One very important thing to keep in mind is; since we are creating the database for ALL of our tests, they are inevitably bounded by a shared resource and we need to take care of cross-contamination between tests.
Although this is against testing principles, it was an optimisation to gain much better execution time (remember, booting up an instance can take ~5 secs on an average).
One very easy thing to do prevent data leaks between tests is cleaning up the database after/before each test and loading up new dummy data for that particular test.

```javascript
describe("Get Todos", () => {  
  beforeEach(async () => { //inserting some dummy data to be used in the following test.  
    await knex.raw("insert into todo_list values(123, '345');");  
    await knex.raw("insert into todo_list values(234, '456');");  
  });  
  afterEach(async () => { //cleaning up the database to be a `good neighbour` and prevent cross contamination between tests.  
    await knex.raw("delete from todo_list");  
  });  
  it("should return all todos", async done => {  
    const res = await request(app).get("/api/todos");  
    expect(res.statusCode).toEqual(200);  
    expect(res.body.length).toEqual(2);  
    done();  
  });  
```

Enjoy!

