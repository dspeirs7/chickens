using Chickens.Api.Models;
using Chickens.Api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Chickens.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChickensController : ControllerBase
{
    private readonly ChickensService _chickensService;
    private readonly ILogger _logger;

    public ChickensController(ChickensService chickensService, ILogger<ChickensController> logger)
    {
        _chickensService = chickensService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<List<Chicken>> Get() =>
        await _chickensService.GetAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Chicken>> Get(string id)
    {
        var chicken = await _chickensService.GetAsync(id);

        if (chicken is null)
        {
            return NotFound();
        }

        return chicken;
    }

    [HttpPost]
    public async Task<IActionResult> Post(Chicken newChicken)
    {
        await _chickensService.CreateAsync(newChicken);

        return CreatedAtAction(nameof(Get), new { id = newChicken.Id }, newChicken);
    }

    [HttpPost("image/{id:length(24)}")]
    public async Task<IActionResult> Post(string id, [FromForm] IFormFile image)
    {
        var chicken = await _chickensService.GetAsync(id);

        if (chicken is null)
        {
            return NotFound();
        }

        if (!string.IsNullOrEmpty(chicken.ImageUrl))
        {
            await _chickensService.RemoveImageAsync(chicken.ImageUrl);
        }

        chicken.ImageUrl = await _chickensService.SaveImageAsync(id, image);

        await _chickensService.UpdateAsync(id, chicken);

        return Ok(new { ImageUrl = chicken.ImageUrl });
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Chicken updatedChicken)
    {
        var chicken = await _chickensService.GetAsync(id);

        if (chicken is null)
        {
            return NotFound();
        }

        updatedChicken.Id = chicken.Id;

        await _chickensService.UpdateAsync(id, updatedChicken);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var chicken = await _chickensService.GetAsync(id);

        if (chicken is null)
        {
            return NotFound();
        }

        if (!string.IsNullOrEmpty(chicken.ImageUrl))
        {
            await _chickensService.RemoveImageAsync(chicken.ImageUrl);
        }

        await _chickensService.RemoveAsync(id);

        return NoContent();
    }
}