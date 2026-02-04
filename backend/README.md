# Backend (C# ASP.NET Core)

This folder contains a minimal ASP.NET Core Web API that replaces the previous Python FastAPI backend.

Prerequisites
- .NET SDK (recommended: .NET 8)
- MongoDB accessible via `MONGO_URL` and `DB_NAME` environment variables

Run locally

Windows PowerShell example:

```powershell
setx MONGO_URL "mongodb://localhost:27017"
setx DB_NAME "mydb"
dotnet restore
dotnet run --project backend.csproj
```

Endpoints
- `GET /api/` — health / hello world
- `POST /api/status` — create status check ({ "clientName": "..." })
- `GET /api/status` — list status checks
