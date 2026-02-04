namespace Backend.Models;
public class Blog
{
    public Guid Id { get; set; }
    public required string Title { get; set; }
    public required string Content { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}

public class Testimonial
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Message { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}

public class ContactMessage
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string Message { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}

public class StatusCheck
{
    public Guid Id { get; set; }  // Guid instead of string
    public required string ClientName { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}
