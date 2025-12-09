using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsWorldAPI.Contexts;
using SportsWorldAPI.Models;

namespace SportsWorldAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class AthleteController(SportsWorldContext _sportsWorldContext) : ControllerBase
{


// ===GET / athlete, henter athletes fra db===

 [HttpGet] 
 public async Task<ActionResult<List<Athlete>>>  Get()
    {
        try
        {
            // Henter alle rader fra Athletes-tabellen som en liste
        List<Athlete> athletes = await _sportsWorldContext.Athletes.ToListAsync();

        // Ok = 200-melding med data i responsen
        return Ok (athletes);
         }
         catch
        {
            // 500 = serverfeil. Teksten er kun for debugging
            return StatusCode (500, "Server side error when getting athletes");
        }
    }


    // ===GET / athlete / {id}===
    // Henter en athlete basert på id

    [HttpGet("{id}")]
    public async Task<ActionResult<Athlete>> Get(int id)
    {
        try
        {
            // FindAsync søker etter en rad med riktig id (primærnøkkel)
            Athlete? athlete = await _sportsWorldContext.Athletes
            .FindAsync(id);
            if (athlete != null)
            {
                // Fant athleten og returnerer 200 med objekt
                return Ok(athlete); // 200
            }
            else
            {
                // Fant ikke, returnerer 404
                return NotFound(); // 404
            }
        }
        catch
        {
            // Noe gikk galt på serveren
            return StatusCode(500);
        }
    }


    // ===POST / athlete===
    // Oppretter en ny athlete i db

    [HttpPost]
    public async Task<ActionResult> Post(Athlete newAthlete)
    {
        try
        {
            // Legger til objektet i "endringslisten" til context
            _sportsWorldContext.Athletes.Add(newAthlete);
            // Lagrer endringene til db (INSERT)
            await _sportsWorldContext.SaveChangesAsync();
            return Created(); // 201
        }
        catch
        {
            return StatusCode(500);
        }
    }



    // ===PUT / athlete
    // Oppdaterer en eksisterende athlete
    // (forventer at editedAthlete har en gyrldig id)

    [HttpPut]
    public async Task<IActionResult> Put(Athlete editedAthlete) // metoden tar imot et athleteobjekt
    {
        try
        {
             // Context gjøres klar for å gjøre endring på redigert athlete; 
             // Context greier å finne den igjen basert på id'en til athleten.
            _sportsWorldContext.Athletes.Entry(editedAthlete).State = EntityState.Modified;
            //Utfører lagringen (UPDATE)
            await _sportsWorldContext.SaveChangesAsync();
            return NoContent(); // 204 melding som betyr at det gikk bra og at det ikke er nødvendig med noe tilbake.
        }
        catch
        {
            return StatusCode(500);
        }
    }



   // ===DELETE / athlete / {id}===
   // Sletter en athlete basert på id

    [HttpDelete("{id}")]
    public async Task <IActionResult> Delete(int id)
    {
        try
        {
            // Prøver finne athleten som skal slettes
            Athlete? athlete = await _sportsWorldContext.Athletes.FindAsync(id);

            if (athlete != null)
            {
                // Fjerner objektet fra context
                _sportsWorldContext.Athletes.Remove(athlete);
                // Lagrer endringene (DELETE)
                await _sportsWorldContext.SaveChangesAsync();
                // 204 = slettet ok
                return NoContent();
            }
            else
            {
                // Ingen athlete med den id-en
                return NotFound(); // 404
            }
        }
        catch
        {
            return StatusCode(500); // server error
        }
    }

}
