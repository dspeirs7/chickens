using Chickens.Api.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Chickens.Api.Services;

public class ChickensService
{
    private readonly IMongoCollection<Chicken> _chickenCollection;

    public ChickensService(IOptions<ChickensDatabaseSettings> chickensDatabaseSettings)
    {
        var mongoClient = new MongoClient(chickensDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(chickensDatabaseSettings.Value.DatabaseName);

        _chickenCollection = mongoDatabase.GetCollection<Chicken>(chickensDatabaseSettings.Value.ChickensCollectionName);
    }

    public async Task<List<Chicken>> GetAsync() => await _chickenCollection.Find(_ => true).ToListAsync();

    public async Task<Chicken?> GetAsync(string id) => await _chickenCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Chicken chicken) => await _chickenCollection.InsertOneAsync(chicken);

    public async Task UpdateAsync(string id, Chicken chicken) => await _chickenCollection.ReplaceOneAsync(x => x.Id == id, chicken);

    public async Task RemoveAsync(string id) => await _chickenCollection.DeleteOneAsync(x => x.Id == id);
}