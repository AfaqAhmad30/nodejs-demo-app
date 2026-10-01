const express = require("express");

function createApp() {
  const app = express();

  app.get("/", (_req, res) => {
    res.status(200).json({
      status: "ok",
      message: "nodejs-demo-app is running",
    });
  });

  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "healthy" });
  });

  return app;
}

module.exports = { createApp };
