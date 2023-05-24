using Chickens.Api.Models;
using Chickens.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Chickens.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChickensController : ControllerBase
{
    private readonly ChickensService _chickensService;

    public ChickensController(ChickensService chickensService) =>
        _chickensService = chickensService;

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

        await _chickensService.RemoveAsync(id);

        return NoContent();
    }
}