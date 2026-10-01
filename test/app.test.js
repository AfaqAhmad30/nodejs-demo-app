const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { createApp } = require("../src/app");

function request(app, path) {
  return new Promise((resolve, reject) => {
    const server = app.listen(0, () => {
      const { port } = server.address();
      fetch(`http://127.0.0.1:${port}${path}`)
        .then(async (res) => {
          const body = await res.json();
          resolve({ status: res.status, body });
        })
        .catch(reject)
        .finally(() => server.close());
    });
  });
}

describe("nodejs-demo-app", () => {
  it("returns a health payload on /", async () => {
    const app = createApp();
    const { status, body } = await request(app, "/");
    assert.equal(status, 200);
    assert.equal(body.status, "ok");
    assert.equal(body.message, "nodejs-demo-app is running");
  });

  it("returns healthy on /health", async () => {
    const app = createApp();
    const { status, body } = await request(app, "/health");
    assert.equal(status, 200);
    assert.equal(body.status, "healthy");
  });
});
