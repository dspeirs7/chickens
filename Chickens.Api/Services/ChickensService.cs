using Chickens.Api.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Chickens.Api.Services;

public class ChickensService
{
    private readonly IMongoCollection<Chicken> _chickenCollection;
    private readonly ILogger _logger;

    public ChickensService(IOptions<ChickensDatabaseSettings> chickensDatabaseSettings, ILogger<ChickensService> logger)
    {
        var mongoClient = new MongoClient(chickensDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(chickensDatabaseSettings.Value.DatabaseName);

        _chickenCollection = mongoDatabase.GetCollection<Chicken>(chickensDatabaseSettings.Value.ChickensCollectionName);

        _logger = logger;
    }

    public async Task<List<Chicken>> GetAsync() => await _chickenCollection.Find(_ => true).ToListAsync();

    public async Task<Chicken?> GetAsync(string id) => await _chickenCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Chicken chicken) => await _chickenCollection.InsertOneAsync(chicken);

    public async Task UpdateAsync(string id, Chicken chicken) => await _chickenCollection.ReplaceOneAsync(x => x.Id == id, chicken);

    public async Task RemoveAsync(string id) => await _chickenCollection.DeleteOneAsync(x => x.Id == id);

    public async Task<string> SaveImageAsync(string id, IFormFile image)
    {
        var basePath = Path.Combine(Environment.CurrentDirectory, "images/");
        var fileName = Path.GetFileNameWithoutExtension(image.FileName);
        var ext = Path.GetExtension(image.FileName);

        var iteration = 0;

        while (File.Exists($"{basePath}{GetFileName(fileName, iteration, ext)}"))
        {
            iteration++;
        }

        var path = $"{basePath}{GetFileName(fileName, iteration, ext)}";

        using (var stream = new FileStream(path, FileMode.Create))
        {
            await image.CopyToAsync(stream);
        }

        return $"images/{GetFileName(fileName, iteration, ext)}";
    }

    public async Task RemoveImageAsync(string path)
    {
        var filePath = Path.Combine(Environment.CurrentDirectory, path);

        if (File.Exists(filePath))
        {
            await Task.Run(() => File.Delete(filePath));
        }
    }

    private string GetFileName(string fileName, int iteration, string ext)
    {
        return $"{fileName}{(iteration > 0 ? $"-{iteration}" : string.Empty)}{ext}";
    }
}