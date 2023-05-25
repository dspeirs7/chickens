using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Chickens.Api.Models;

public class Chicken
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string? ImageUrl { get; set; } = null;
    public ChickenType Type { get; set; } = ChickenType.Brahma;
    public Vaccinations[] Vaccinations { get; set; } = Array.Empty<Vaccinations>();
}

public enum ChickenType
{
    Brahma = 1,
    BuffOrpington = 2,
}