# NiceShore Server

This folder contains the backend API for NiceShore. The server is a Go application built with Gin and GORM, and it connects to PostgreSQL for persistence.

## Tech Stack

- Go 1.26.3
- Gin HTTP framework
- GORM ORM
- PostgreSQL
- JWT authentication
- Dotenv environment loading

## Main Entry Point

The application starts in [main.go](main.go).

On startup it:

1. loads environment variables
2. connects to PostgreSQL
3. runs migrations
4. optionally seeds data when the `seed` command is passed
5. starts the HTTP server on port `8080`

## Route Structure

Authentication routes are registered in [router/http/auth_routes.go](router/http/auth_routes.go).

```text
GET  /
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/refresh
```

## Authentication

Authentication logic is implemented in:

- [logic/auth/signup.go](logic/auth/signup.go)
- [logic/auth/login.go](logic/auth/login.go)
- [logic/auth/Refresh.go](logic/auth/Refresh.go)

### Signup flow

- validates incoming JSON
- checks if the email already exists
- hashes the password
- creates the user
- assigns the default role `user`
- generates access and refresh tokens

### Login flow

- validates email and password
- verifies password hash
- generates access and refresh tokens

## Database

The database connection is configured in [database/postgres/connection.go](database/postgres/connection.go).

It reads values such as:

- DB_HOST
- DB_USER
- DB_PASSWORD
- DB_NAME
- DB_PORT
- DB_SSLMODE

Migrations are run through [database/migrations/migrate.go](database/migrations/migrate.go).

## Models

Key models include:

- [models/user.go](models/user.go)
- [models/role.go](models/role.go)
- [models/beach.go](models/beach.go)
- [models/permission.go](models/permission.go)
- [models/user_role.go](models/user_role.go)
- [models/role_permission.go](models/role_permission.go)

These model definitions are used with GORM and PostgreSQL.

## Repository Layer

Repository functions are stored in:

- [repository/user_repository.go](repository/user_repository.go)
- [repository/user_role_repository.go](repository/user_role_repository.go)
- [repository/refresh_token_repository.go](repository/refresh_token_repository.go)

This layer manages database interactions for users, roles, permissions, and refresh tokens.

## Utilities

Common helper logic lives in:

- [utils/jwt.go](utils/jwt.go)
- [utils/password.go](utils/password.go)
- [utils/refresh_token.go](utils/refresh_token.go)
- [utils/assign_role.go](utils/assign_role.go)

## Environment Variables

Create a local .env file at the server root with values similar to:

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=niceshore
DB_PORT=5432
DB_SSLMODE=disable
JWT_SECRET_KEY=your_secret_key
```

## Run the Server

From the server directory:

```bash
go mod tidy
go run .
```

Optional seeding:

```bash
go run . seed
```

## Default Response

When the server is running, the root endpoint responds with:

```json
{
  "message": "Beach safe API is running succefully"
}
```

## Notes

This backend currently provides the authentication foundation for the application. It is ready to be expanded with protected endpoints, beach data APIs, and more business logic as the NiceShore platform grows.
