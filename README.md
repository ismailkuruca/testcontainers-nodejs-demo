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
- Somewhat increased complexity in the test code, although this is to be expected when we go `up` in the testing pyramid.

## How to use it

TBD
