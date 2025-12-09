using Microsoft.AspNetCore.Mvc;

namespace SportsWorldAPI.Controllers;

[ApiController]
[Route("[controller]")]

public class ImageUpLoadController(IWebHostEnviroment _webHostEnviroment) : ControllerBase
{
    
[HttpPost]

public async Task<IActionResult> Post(IForm file)
    {
        try
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file provided");
            }
        }
    }

}