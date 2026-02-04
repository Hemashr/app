using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

var builder = WebApplication.CreateBuilder(args);

// SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
    builder.Configuration.GetConnectionString("DefaultConnection")
););

// CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

app.UseCors();

// ---------- API ----------

app.MapGet("/api", () => new { message = "Backend running" });

app.MapPost("/api/status", async (AppDbContext db, StatusCheck input) =>
{
    if (string.IsNullOrWhiteSpace(input.ClientName))
        return Results.BadRequest("ClientName is required");

    input.Id = Guid.NewGuid().ToString();
    input.Timestamp = DateTime.UtcNow;

    db.StatusChecks.Add(input);
    await db.SaveChangesAsync();

    return Results.Created($"/api/status/{input.Id}", input);
});

app.MapGet("/api/status", async (AppDbContext db) =>
{
    return await db.StatusChecks.ToListAsync();
});

app.Run();
