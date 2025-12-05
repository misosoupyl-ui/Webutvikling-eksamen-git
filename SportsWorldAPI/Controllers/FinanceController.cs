using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsWorldAPI.Contexts;
using SportsWorldAPI.Models;

namespace SportsWorldAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class FinanceController(SportsWorldContext _sportsworldcontext) : ControllerBase
{
 [HttpGet] 
 public async Task<List<Finance>>  Get()
    {
        List<Finance> finances = await _sportsworldcontext.Finances.ToListAsync();
        return finances;
    }
}
