# NiceShore

NiceShore is a coastal-themed digital platform with a premium SaaS . The project combines a refined visual identity inspired by ocean and shoreline tones with a server that handles authentication, user management, and beach-related data.

## System Overview

The system is split into two main parts:

- Client experience: a design system and styling foundation for the product interface.
- Server: a Gin + GORM API built in Go, connected to PostgreSQL and using JWT-based authentication.

This project currently focuses on the backend foundation and the brand look that is defined in the client design specification.

## Design System / Look & Feel

The visual identity is called Coastal Precision and is built around a calm, premium coastal aesthetic.

### Core design direction

- Primary color: deep ocean blue (#003366)
- Accent color: sky cyan (#00BFFF)
- Background: soft white / sandy neutral surfaces
- Style: modern, minimal, airy, editorial, high-trust SaaS aesthetic
- Typography: Plus Jakarta Sans
- Shapes: rounded corners, soft cards, pill-style UI elements

### Brand feel

The interface is meant to feel:

- professional and trustworthy
- calm and modern
- spacious and easy to scan
- premium without being cluttered

The design document in the client folder contains the exact visual tokens, spacing, typography, and component rules used for the product look.

## Backend System

The server is built with:

- Go
- Gin Web Framework
- GORM ORM
- PostgreSQL
- JWT for access and refresh tokens
- Dotenv-based environment configuration

### Main features

- User signup
- User login
- Refresh token flow
- Role assignment
- Database migration setup
- Seeder commands for default roles and permissions

### API entry points

- GET /
- POST /api/auth/signup
- POST /api/auth/login
- POST /api/auth/refresh

## Project Structure

```text
NiceShore/
+-- client/
�   +-- design.md
+-- server/
�   +-- NiceshoreServer/
�       +-- config/
�       +-- console/
�       +-- database/
�       +-- logic/
�       +-- models/
�       +-- repository/
�       +-- router/
�       +-- utils/
�       +-- go.mod
�       +-- main.go
�       +-- readme.md
+-- readme.md
+-- .env.example (if configured locally)
```

## Server Setup

1. Open the server folder:

```bash
cd server/NiceshoreServer
```

2. Install Go dependencies:

```bash
go mod tidy
```

3. Configure your environment variables in a local .env file:

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=niceshore
DB_PORT=5432
DB_SSLMODE=disable
JWT_SECRET_KEY=your_secret_key
```

4. Run the server:

```bash
go run .
```

5. Optional seed command:

```bash
go run . seed
```

## Server Behaviour

When the application starts, it:

- loads environment variables
- connects to PostgreSQL
- runs database migrations
- registers routes
- starts the Gin HTTP server on port 8080

The root route returns:

```json
{
  "message": "Beach safe API is running succefully"
}
```

## Authentication Flow

The API currently supports a JWT-based authentication scheme using:

- access token for session access
- refresh token for renewing access
- user and role assignment on signup

## Notes

This project is still in an early backend phase. The design direction is clearly defined in the client design system, and the Go server is the functional foundation for authentication and database-driven features.

## Recommended next steps

- connect the frontend to the auth endpoints
- add protected routes and middleware
- expand beach and location models
- add admin and moderation flows
- document API responses more formally

---

For the backend-specific details, see [server/NiceshoreServer/readme.md](server/NiceshoreServer/readme.md).
