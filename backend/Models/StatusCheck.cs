namespace Backend.Models;

public class StatusCheck
{
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public required string ClientName { get; set; }

    public DateTime Timestamp { get; set; }
}
