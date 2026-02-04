namespace Backend.Models;

public class StatusCheck
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string ClientName { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}
