# nodejs-demo-app

Sample Node.js web app with a GitHub Actions CI/CD pipeline that tests the app, builds a Docker image, and pushes it to Docker Hub.

## Local run

```bash
npm install
npm test
npm start
```

Open http://localhost:3000 — you should see `{ "status": "ok", "message": "nodejs-demo-app is running" }`.

## Docker

```bash
docker build -t nodejs-demo-app .
docker run --rm -p 3000:3000 nodejs-demo-app
```

After the pipeline publishes the image:

```bash
docker pull <DOCKERHUB_USERNAME>/nodejs-demo-app:latest
docker run --rm -p 3000:3000 <DOCKERHUB_USERNAME>/nodejs-demo-app:latest
```

## CI/CD pipeline

Workflow: [`.github/workflows/main.yml`](.github/workflows/main.yml)

Triggered on every push to `main` (and via **Actions → Run workflow**).

| Job | What it does |
| --- | --- |
| `test` | Installs Node.js 20 dependencies and runs `npm test` |
| `build` | Builds the Docker image without pushing |
| `deploy` | Logs in to Docker Hub and pushes `:latest` plus a git SHA tag |

### GitHub secrets

Add these under **Settings → Secrets and variables → Actions**:

- `DOCKERHUB_USERNAME` — your Docker Hub username
- `DOCKERHUB_TOKEN` — a Docker Hub [access token](https://docs.docker.com/security/for-developers/access-tokens/), not your account password
