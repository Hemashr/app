using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

var builder = WebApplication.CreateBuilder(args);

// SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

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

// ---------- Minimal API Endpoints ----------

// Health check
app.MapGet("/api", () => new { message = "Backend running" });

// ----------------- Blogs -----------------
app.MapGet("/api/blogs", async (AppDbContext db) =>
    await db.Blogs.ToListAsync()
);

app.MapPost("/api/blogs", async (AppDbContext db, Blog blog) =>
{
    blog.Id = Guid.NewGuid();
    blog.Timestamp = DateTime.UtcNow;

    db.Blogs.Add(blog);
    await db.SaveChangesAsync();

    return Results.Created($"/api/blogs/{blog.Id}", blog);
});

// ----------------- Testimonials -----------------
app.MapGet("/api/testimonials", async (AppDbContext db) =>
    await db.Testimonials.ToListAsync()
);

app.MapPost("/api/testimonials", async (AppDbContext db, Testimonial testimonial) =>
{
    testimonial.Id = Guid.NewGuid();
    testimonial.Timestamp = DateTime.UtcNow;

    db.Testimonials.Add(testimonial);
    await db.SaveChangesAsync();

    return Results.Created($"/api/testimonials/{testimonial.Id}", testimonial);
});

// ----------------- Contact Messages -----------------
app.MapGet("/api/contact", async (AppDbContext db) =>
    await db.ContactMessages.ToListAsync()
);

app.MapPost("/api/contact", async (AppDbContext db, ContactMessage message) =>
{
    message.Id = Guid.NewGuid();
    message.Timestamp = DateTime.UtcNow;

    db.ContactMessages.Add(message);
    await db.SaveChangesAsync();

    return Results.Created($"/api/contact/{message.Id}", message);
});

app.Run();
