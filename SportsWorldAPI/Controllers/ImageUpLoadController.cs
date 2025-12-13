using Microsoft.AspNetCore.Mvc;

namespace SportsWorldAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ImageUploadController(IWebHostEnvironment webHostEnvironment) : ControllerBase
{
    [HttpPost]
    // navnet "file" må matche i frontend (formData.append("file", ...))
    public async Task<IActionResult> Post(IFormFile file) // bilde kommer inni IFormFile-objektet
    {
        try
        {
            // IF/ELSE: sjekker at bildefilen ikke er null og har innhold
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded");
            }

            // Rotmappa til wwwroot
            string webRootPath = webHostEnvironment.WebRootPath;

            // Lager "images"-mappen hvis den ikke fins fra før
            string imagesFolder = Path.Combine(webRootPath, "images");
            if (!Directory.Exists(imagesFolder))
            {
                Directory.CreateDirectory(imagesFolder);
            }

            // GUID: genererer tilfeldig navn, men beholder filendelsen (f.eks. .jpg, .png)
            string extension = Path.GetExtension(file.FileName);
            string newFileName = Guid.NewGuid().ToString() + extension;

            // Full sti: wwwroot/images/<guid>.jpg
            string absolutePath = Path.Combine(imagesFolder, newFileName);

            using (var fileStream = new FileStream(absolutePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            // returnerer 201 Created, og kan også sende tilbake filnavnet hvis dere vil bruke det i frontend
            return Created(string.Empty, new { fileName = newFileName});
        }
        catch
        {
            return StatusCode(500);
        }
    }
}

// if else for å sjekke at bildefilen ikke er null må gjøres
// ideelt sett bruker man GUID for tilfeldig navn'