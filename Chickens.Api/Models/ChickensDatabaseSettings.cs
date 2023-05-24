namespace Chickens.Api.Models;

public class ChickensDatabaseSettings
{
    public string ConnectionString { get; set; } = null!;
    public string DatabaseName { get; set; } = null!;
    public string ChickensCollectionName { get; set; } = null!;
}