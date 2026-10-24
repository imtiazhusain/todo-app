# Task Manager

Full stack task app: React + TypeScript (Vite, Tailwind CSS) on the front end, Node.js + Express + Mongoose on the back end, MongoDB for storage.

## Setup

Requirements: Node.js 20+ and a MongoDB instance (local, or a free MongoDB Atlas cluster).

```bash
# 1. API
cd server
cp .env.example .env      # set MONGODB_URI if you are not using local MongoDB
npm install
npm run dev               # http://localhost:5000

# 2. Client (new terminal)
cd client
npm install
npm run dev               # http://localhost:5173 (proxies /api to :5000)
```

For a deployed client, set `VITE_API_URL` to the API's public URL (for example `https://api.example.com/api`) and set `FRONTEND_URL` on the server to the client's URL.

## Database schema (MongoDB / Mongoose)

Collection: `tasks`

| Field         | Type    | Rules                          |
|---------------|---------|--------------------------------|
| `_id`         | ObjectId| generated                      |
| `title`       | String  | required, trimmed, max 100     |
| `description` | String  | optional, trimmed, max 500     |
| `completed`   | Boolean | default `false`                |
| `createdAt`   | Date    | set automatically              |
| `updatedAt`   | Date    | set automatically              |

Index: `createdAt` descending, because the list is shown newest first.

## REST API

Base path: `/api`. Success responses use `{ "data": ... }`; errors use `{ "message": "...", "errors": [{ "field", "message" }] }`.

| Method | Endpoint     | Purpose                              | Success | Errors   |
|--------|--------------|--------------------------------------|---------|----------|
| GET    | `/tasks`     | Get all tasks (newest first)         | 200     | 500      |
| POST   | `/tasks`     | Create a task                        | 201     | 400      |
| PATCH  | `/tasks/:id` | Update title, description, completed | 200     | 400, 404 |
| DELETE | `/tasks/:id` | Delete a task                        | 204     | 400, 404 |

Example:

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Write the README","description":"Include the schema"}'
```

## Structure

```
server/src
  config/        env variables config
  database/       db connection code
  models/        Mongoose schema
  validators/    Zod request schemas
  middlewares/   validation, 404 and centralized error handler
  routes/        URL -> controller mapping
  controllers/   HTTP layer (status codes, responses)
  services/      business logic and database access
  utils/         ApiError, asyncHandler

client/src
  pages/         HomePage (composes the UI)
  components/    TaskForm, TaskList, TaskItem, ErrorBanner
  hooks/         useTasks (state and actions)
  api/           fetch wrapper and task endpoints
  types/         shared TypeScript types
```

## Design decisions

- Controllers only handle HTTP; all logic and database calls live in the service layer.
- Request bodies are validated with Zod before reaching controllers, and `:id` params are checked as ObjectIds.
- All errors flow to one handler that maps Zod, Mongoose and custom `ApiError` cases to the right status code and hides internals on 500s.
- Updates use `PATCH` so toggling completion only sends `{ completed }`.
