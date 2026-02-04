using MongoDB.Driver;
using Backend.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var mongoUrl = Environment.GetEnvironmentVariable("MONGO_URL") ?? "mongodb://localhost:27017";
var dbName = Environment.GetEnvironmentVariable("DB_NAME") ?? "mydb";
var client = new MongoClient(mongoUrl);
var database = client.GetDatabase(dbName);
var collection = database.GetCollection<StatusCheck>("status_checks");

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/api/", () => Results.Json(new { message = "Hello World" }));

app.MapPost("/api/status", async (Backend.DTOs.StatusCheckCreate input) =>
{
    var status = new StatusCheck
    {
        Id = Guid.NewGuid().ToString(),
        ClientName = input.ClientName,
        Timestamp = DateTime.UtcNow
    };
    await collection.InsertOneAsync(status);
    return Results.Created($"/api/status/{status.Id}", status);
});

app.MapGet("/api/status", async () =>
{
    var list = await collection.Find(_ => true).ToListAsync();
    return Results.Json(list);
});

app.Lifetime.ApplicationStopping.Register(() => { /* Mongo client will be disposed by runtime if needed */ });

app.Run();
