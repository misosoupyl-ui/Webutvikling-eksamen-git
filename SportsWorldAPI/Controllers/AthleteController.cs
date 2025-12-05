using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsWorldAPI.Contexts;
using SportsWorldAPI.Models;

namespace SportsWorldAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class AthleteController(SportsWorldContext _sportsworldcontext) : ControllerBase
{
 [HttpGet] 
 public async Task<List<Athlete>>  Get()
    {
        List<Athlete> athletes = await _sportsworldcontext.Athletes.ToListAsync();
        return athletes;
    }
}
